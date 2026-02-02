import Stripe from "stripe";
import { env } from "./env";
export const stripe = env.STRIPE_SECRET_KEY ? new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" }) : null;
export const prices = { STARTER: env.STRIPE_PRICE_STARTER, PRO: env.STRIPE_PRICE_PRO };
