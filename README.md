# Upwords

Raw notes to exec-ready updates. Built for first-time Heads and VPs.

## What it does

1. User signs up and completes onboarding (role, company, who they report to, what matters to them)
2. User pastes raw notes about their week
3. AI transforms them into a polished update tailored for their specific manager

## Setup

### 1. Clone and install

```bash
git clone https://github.com/yourusername/upwords.git
cd upwords
npm install
```

### 2. Set up environment variables

Create a `.env` file in the root:

```
ANTHROPIC_API_KEY=your_api_key_here
```

### 3. Run locally

```bash
npm run dev
```

## Deploy to Vercel

1. Push to GitHub
2. Connect repo to Vercel
3. Add `ANTHROPIC_API_KEY` to Vercel environment variables (Settings → Environment Variables)
4. Deploy

## Tech stack

- React + Vite
- Vercel Serverless Functions
- Anthropic Claude API
