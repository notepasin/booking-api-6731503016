# Campus Equipment Booking API

## Run Instructions
This API is built using Hono and Cloudflare D1 (Serverless Database).

**To run locally for development:**
1. Install dependencies: `npm install`
2. Start the local server: `npm run dev`

**To deploy to Cloudflare Workers:**
Run the following command: `npm run deploy`
The live Base URL is: `https://booking-api.noppasinmaun.workers.dev`

## Database Schema (ERD)
The system uses a Cloudflare D1 (SQLite) database with two main tables:

**1. Equipment**
* `id` (TEXT, Primary Key) - The unique identifier for the equipment.
* `name` (TEXT, Not Null) - The name of the equipment.
* `location` (TEXT, Not Null) - The storage location of the equipment.

**2. Bookings**
* `id` (INTEGER, Primary Key, Auto Increment) - The unique booking ID.
* `equipmentId` (TEXT, Foreign Key -> Equipment.id) - The booked equipment's ID.
* `borrowerName` (TEXT, Not Null) - Name of the person borrowing.
* `startAt` (TEXT, Not Null) - Booking start time (ISO 8601 format).
* `endAt` (TEXT, Not Null) - Booking end time (ISO 8601 format).
* `purpose` (TEXT) - The purpose of the booking.

## API Contract

**Base URL:** `https://booking-api.noppasinmaun.workers.dev`

| Method | Path | Success Status | Purpose |
|---|---|---|---|
| GET | `/api/equipment` | 200 | List all equipment |
| GET | `/api/bookings` | 200 | List all bookings |
| GET | `/api/bookings/:id` | 200 | Get a specific booking by ID |
| POST | `/api/bookings` | 201 | Create a new booking |
| PATCH | `/api/bookings/:id` | 200 | Update booking times (startAt, endAt) |
| DELETE | `/api/bookings/:id` | 204 | Delete/Cancel a booking |

**Error Responses:**
All errors are returned in JSON format: `{ "error": "A clear error message" }`
* `400 Bad Request` - Missing required fields, or `startAt` is after `endAt`.
* `404 Not Found` - The requested resource or `equipmentId` does not exist.
* `409 Conflict` - The equipment is already booked during the requested time (overlapping).