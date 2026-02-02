# AI Governance SaaS (Replit-ready ZIP)

Lightweight full-stack SaaS to **detect risky AI usage**, **flag sensitive data**, and **store audit logs** — with **optional Stripe subscriptions**.

## Quickstart

```bash
npm install
npx prisma db push
npm run db:seed
npm run dev
```

Open http://localhost:3000

Demo account (after seed):
- admin@example.com / admin1234

## Stripe (optional)

Set env vars:
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- STRIPE_PRICE_STARTER
- STRIPE_PRICE_PRO

Webhook endpoint:
- /api/stripe/webhook
