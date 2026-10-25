# Tunnu SI

React/Vite frontend with an Express API and MongoDB-backed contact requests.
The light/dark appearance preference is saved in the browser.

## Run locally

1. Install MongoDB locally or create a MongoDB Atlas database.
2. Copy `.env.example` to `.env` and set `MONGODB_URI` to your database connection string.
3. Run `npm install`, then `npm run dev`.
4. Open the Vite URL shown in the terminal. Vite proxies `/api` requests to the Express server on port 3000.

The API starts even when MongoDB is not configured, but contact submissions require a connected database. Its health endpoint is `GET /api/health` (returns `503` when MongoDB is disconnected); contact requests are submitted to `POST /api/contact`.

## Contact email notifications

The API stores each contact request in MongoDB, then sends a notification through Resend when `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set in `.env`. For initial testing, use a Resend API key and the email address associated with your Resend account as the recipient; Resend's `onboarding@resend.dev` sender is the default. For production, verify your sending domain with Resend and set `CONTACT_FROM_EMAIL` to an address on that domain. Restart the API after changing `.env`.

The contact form only reports that a notification was sent when Resend confirms acceptance. If email is not configured or delivery is rejected, the request remains saved in MongoDB and the form reports that the notification was not sent.

## Production

Run `npm run build`, then set `MONGODB_URI` and optionally `PORT` in the environment and run `npm start`. Express serves the built frontend and API from the same origin.

`npm run lint` checks the project source.
