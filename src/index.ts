import { Hono } from 'hono'

type Bindings = { DB: any }
const app = new Hono<{ Bindings: Bindings }>()

app.get('/api/equipment', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM Equipment').all()
  return c.json(results)
})

app.get('/api/bookings', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM Bookings').all()
  return c.json(results)
})

app.get('/api/bookings/:id', async (c) => {
  const id = c.req.param('id')
  const booking = await c.env.DB.prepare('SELECT * FROM Bookings WHERE id = ?').bind(id).first()
  if (!booking) return c.json({ error: "Booking not found" }, 404)
  return c.json(booking)
})

app.post('/api/bookings', async (c) => {
  const body = await c.req.json().catch(() => null)
  if (!body) return c.json({ error: "Invalid JSON body" }, 400)
  
  const { equipmentId, borrowerName, startAt, endAt, purpose } = body
  if (!equipmentId || !borrowerName || !startAt || !endAt) {
    return c.json({ error: "Missing required fields" }, 400)
  }
  if (new Date(startAt) >= new Date(endAt)) {
    return c.json({ error: "startAt must be before endAt" }, 400)
  }
  
  const eq = await c.env.DB.prepare('SELECT id FROM Equipment WHERE id = ?').bind(equipmentId).first()
  if (!eq) return c.json({ error: "Equipment not found" }, 404)

  const overlap = await c.env.DB.prepare('SELECT * FROM Bookings WHERE equipmentId = ? AND startAt < ? AND endAt > ?').bind(equipmentId, endAt, startAt).first()
  if (overlap) return c.json({ error: "Equipment is already booked during this time" }, 409)

  const result = await c.env.DB.prepare('INSERT INTO Bookings (equipmentId, borrowerName, startAt, endAt, purpose) VALUES (?, ?, ?, ?, ?) RETURNING *').bind(equipmentId, borrowerName, startAt, endAt, purpose).first()
  return c.json(result, 201)
})

app.patch('/api/bookings/:id', async (c) => {
  const id = c.req.param('id')
  const body = await c.req.json().catch(() => null)
  if (!body) return c.json({ error: "Invalid JSON body" }, 400)
  
  const { startAt, endAt } = body
  if (startAt && endAt && new Date(startAt) >= new Date(endAt)) {
    return c.json({ error: "startAt must be before endAt" }, 400)
  }
  
  const existing = await c.env.DB.prepare('SELECT * FROM Bookings WHERE id = ?').bind(id).first()
  if (!existing) return c.json({ error: "Booking not found" }, 404)

  await c.env.DB.prepare('UPDATE Bookings SET startAt = ?, endAt = ? WHERE id = ?').bind(
    startAt || existing.startAt, 
    endAt || existing.endAt, 
    id
  ).run()
  
  const updated = await c.env.DB.prepare('SELECT * FROM Bookings WHERE id = ?').bind(id).first()
  return c.json(updated, 200)
})

app.delete('/api/bookings/:id', async (c) => {
  const id = c.req.param('id')
  const result = await c.env.DB.prepare('DELETE FROM Bookings WHERE id = ?').bind(id).run()
  if (result.meta.changes === 0) return c.json({ error: "Booking not found" }, 404)
  return c.body(null, 204)
})

export default app