# Vendor Orders Frontend (Vercel)
React + Vite app to view orders.

## Local
```bash
cp .env.example .env     # edit VITE_API=http://localhost:4000
npm install
npm run dev
```
Open http://localhost:5173

## Deploy to Vercel
- Import repo in Vercel
- Set Environment Variable: `VITE_API = https://your-backend.up.railway.app`
- Build command: `npm run build`
- Output dir: `dist`
