# Hug Day Greeting — for Sumedha

A lightweight, animated Valentine's Hug Day greeting website.

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import the repo
3. Vercel will auto-detect the config from `vercel.json`
4. Click **Deploy** — that's it!

Or use the CLI:
```bash
npm i -g vercel
vercel --prod
```

## What it does

- Shows two cute characters (boy & girl) with a **"Send a Hug"** button
- On click → characters merge into a hugging couple with a heart particle explosion
- Personalized message: *"Happy Hug Day, Sumedha!"* signed *— Naman*

## Tech Stack

- React 19 + Tailwind CSS
- Framer Motion (spring animations)
- Inline SVG characters (zero external image deps)
- Google Fonts: Great Vibes + Quicksand

## Local Development

```bash
cd frontend
yarn install
yarn start
```
