# AI Assistance Log

Here is the record of AI tools used during the development of this project.

### Entry 1: Database Migration
* **Date:** 2026-10-06
* **AI Tool Used:** Gemini
* **Prompt / Question Asked:** How to migrate my Express/SQLite API to Cloudflare Workers and D1?
* **AI Contribution & Code Used:** Provided the `schema.sql` file structure and Wrangler CLI commands to create remote tables on Cloudflare.
* **How I Checked & Verified:** Ran `npx wrangler d1 execute` and verified the successful database creation in the terminal output.

---

### Entry 2: Overlapping Booking Logic
* **Date:** 2026-10-06
* **AI Tool Used:** Gemini
* **Prompt / Question Asked:** How to check for overlapping booking times in SQL before saving?
* **AI Contribution & Code Used:** Provided the SQL query logic (`startAt < ? AND endAt > ?`) and suggested returning an HTTP 409 Conflict status.
* **How I Checked & Verified:** Tested the `POST /api/bookings` endpoint in Postman with overlapping dates and verified it returned the `409 Conflict` error correctly.

---

### Entry 3: Fixing TypeScript Errors
* **Date:** 2026-10-06
* **AI Tool Used:** Gemini
* **Prompt / Question Asked:** How to fix TypeScript errors for `new Response()` and `D1Database` in Hono?
* **AI Contribution & Code Used:** Advised changing `D1Database` type to `any` and using Hono's `c.body(null, 204)` instead of `new Response()`.
* **How I Checked & Verified:** Applied the changes in `src/index.ts`, confirmed the red squiggly lines disappeared in VS Code, and successfully deployed using `npm run deploy`.