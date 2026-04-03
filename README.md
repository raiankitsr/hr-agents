# HR Outreach Agent — Backend Setup

## What this does
A Node.js/Express server that receives email requests from the frontend and sends them via your Gmail account using Nodemailer + Gmail App Password (no OAuth needed).

---

## Quick Start

### 1. Install dependencies
```bash
cd hr-agent-server
npm install
```

### 2. Create your .env file
```bash
cp .env.example .env
```
Then open `.env` and fill in your Gmail credentials.

### 3. Get a Gmail App Password
> Regular Gmail password will NOT work. You need an App Password.

1. Go to **myaccount.google.com/security**
2. Make sure **2-Step Verification** is ON
3. Search for **"App passwords"** in the search bar
4. Click it → choose app: **Mail**, device: **Other** → name it "HR Agent"
5. Copy the 16-character password (e.g. `abcd efgh ijkl mnop`)
6. Paste it into `.env` as `GMAIL_APP_PASSWORD=abcdefghijklmnop` (no spaces)

### 4. Start the backend server
```bash
npm start
# or for auto-reload during development:
npm run dev
```
You should see: `✅ HR Agent server running on http://localhost:3001`

### 5. Start the frontend (UI)
```bash
npm run frontend
```
The app will open in your browser at `http://localhost:5173`.

---

## Connect to the Frontend

1. Open the HR Outreach Agent in Claude
2. Go to the **Server** tab in the sidebar
3. Enter `http://localhost:3001` (default)
4. Click **Test** — you should see "Server connected ✓"
5. Now **Generate & Send** will auto-send emails directly 🎉

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health check |
| POST | `/send` | Send a single email |
| POST | `/send-batch` | Send multiple emails |

### POST /send — Body
```json
{
  "to": "hr@company.com",
  "subject": "Application for Frontend Engineer",
  "body": "Dear Hiring Manager...",
  "fromName": "Your Name",
  "replyTo": "you@gmail.com"
}
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `Invalid login` error | Make sure you're using App Password, not your regular Gmail password |
| `Less secure app` error | App Passwords bypass this — make sure 2FA is enabled |
| CORS error in browser | Server already has CORS enabled for all origins |
| Port already in use | Change `PORT=3002` in `.env` and update the URL in the app |
| Server works but emails not arriving | Check spam folder; Gmail may flag bulk sends |

---

## .env Reference
```
GMAIL_USER=you@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
PORT=3001
```
