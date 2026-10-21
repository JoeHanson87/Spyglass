# Spyglass & Kettle

Next.js 16 site for the pub, with an owner admin at `/admin`.

- **Data:** Neon Postgres (Drizzle ORM)
- **Files (PDF menus, images):** Vercel Blob
- **Auth:** single owner login (bcrypt hash + signed cookie)
- **Animation:** Motion

## Local setup
```bash
npm install
cp .env.example .env.local      # fill in values
npm run hash -- "your password" # paste output into ADMIN_PASSWORD_HASH
npm run db:push                 # create tables
npm run db:seed                 # load the starter menu, events and nights
npm run dev
```
Without `DATABASE_URL` the public site still runs using built-in sample content.

## Environment variables
| Name | Purpose |
|---|---|
| `DATABASE_URL` | Neon connection string |
| `BLOB_READ_WRITE_TOKEN` | Added automatically when a Blob store is connected |
| `ADMIN_EMAIL` | Owner login email |
| `ADMIN_PASSWORD_HASH` | From `npm run hash` (no quotes on Vercel) |
| `SESSION_SECRET` | `openssl rand -base64 32` |
| `NEXT_PUBLIC_SITE_URL` | e.g. `https://spyglassandkettle.co.uk` |

## Owner guide
Log in at `/admin`. Manage the sample menu, the full PDF menu (set one as primary for the download button), events and live music, weekly special nights, the announcement banner, opening hours and contact details. Changes go live straight away.
