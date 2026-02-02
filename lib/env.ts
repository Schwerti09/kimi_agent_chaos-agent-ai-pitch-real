import { z } from "zod";
const schema = z.object({
  APP_URL: z.string().url(),
  APP_SECRET: z.string().min(16),
  JWT_SECRET: z.string().min(16),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_PRICE_STARTER: z.string().optional(),
  STRIPE_PRICE_PRO: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
});
export const env = schema.parse({
  APP_URL: process.env.APP_URL,
  APP_SECRET: process.env.APP_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  STRIPE_PRICE_STARTER: process.env.STRIPE_PRICE_STARTER,
  STRIPE_PRICE_PRO: process.env.STRIPE_PRICE_PRO,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
});
