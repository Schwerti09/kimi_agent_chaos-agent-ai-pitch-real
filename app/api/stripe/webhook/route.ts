import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "../../../../lib/prisma";
import { stripe } from "../../../../lib/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) return NextResponse.json({ error: "Stripe not configured" }, { status: 400 });

  const sig = headers().get("stripe-signature");
  const body = await req.text();

  let event: any;
  try {
    event = stripe.webhooks.constructEvent(body, sig ?? "", webhookSecret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    if (["customer.subscription.created","customer.subscription.updated"].includes(event.type)) {
      const sub = event.data.object;
      const customerId = sub.customer as string;
      const tier = sub.metadata?.tier === "PRO" ? "PRO" : "STARTER";
      const status = (sub.status ?? "").toUpperCase();

      const org = await prisma.organization.findFirst({ where: { stripeCustomerId: customerId } });
      if (org) {
        await prisma.subscription.upsert({
          where: { organizationId: org.id },
          update: {
            stripeSubscriptionId: sub.id,
            stripeCustomerId: customerId,
            stripePriceId: sub.items?.data?.[0]?.price?.id ?? null,
            status: status === "ACTIVE" ? "ACTIVE" : status === "PAST_DUE" ? "PAST_DUE" : status === "CANCELED" ? "CANCELED" : "TRIALING",
            tier: tier as any,
            currentPeriodStart: new Date((sub.current_period_start ?? Math.floor(Date.now()/1000))*1000),
            currentPeriodEnd: new Date((sub.current_period_end ?? Math.floor(Date.now()/1000))*1000),
            cancelAtPeriodEnd: Boolean(sub.cancel_at_period_end),
          },
          create: {
            organizationId: org.id,
            stripeSubscriptionId: sub.id,
            stripeCustomerId: customerId,
            stripePriceId: sub.items?.data?.[0]?.price?.id ?? null,
            status: "ACTIVE",
            tier: tier as any,
            currentPeriodStart: new Date((sub.current_period_start ?? Math.floor(Date.now()/1000))*1000),
            currentPeriodEnd: new Date((sub.current_period_end ?? Math.floor(Date.now()/1000))*1000),
          }
        });
      }
    }
    if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object;
      const org = await prisma.organization.findFirst({ where: { stripeCustomerId: sub.customer as string }});
      if (org) await prisma.subscription.updateMany({ where: { organizationId: org.id }, data: { status: "CANCELED", cancelAtPeriodEnd: true }});
    }
  } catch (e: any) {
    return NextResponse.json({ error: "Webhook handler failed", details: e.message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
