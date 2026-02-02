import { NextResponse } from "next/server";
import { requireUser } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { stripe, prices } from "../../../../lib/stripe";

export async function POST(req: Request) {
  const auth = await requireUser();
  if (!auth) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  if (!stripe) return NextResponse.json({ error: "Stripe not configured" }, { status: 400 });

  const { tier, successUrl, cancelUrl } = await req.json().catch(()=>({}));
  if (!tier || !successUrl || !cancelUrl) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const org = await prisma.organization.findUnique({ where: { id: auth.session.user.organizationId } });
  if (!org) return NextResponse.json({ error: "Org not found" }, { status: 404 });

  let customerId = org.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: auth.session.user.email,
      name: org.name,
      metadata: { organizationId: org.id, userId: auth.session.user.id },
    });
    customerId = customer.id;
    await prisma.organization.update({ where: { id: org.id }, data: { stripeCustomerId: customerId } });
  }

  const priceId = tier === "PRO" ? prices.PRO : prices.STARTER;
  if (!priceId) return NextResponse.json({ error: "Stripe price not set for tier" }, { status: 400 });

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${successUrl}?stripe=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${cancelUrl}?stripe=cancel`,
    subscription_data: { metadata: { tier } },
  });

  return NextResponse.json({ url: session.url });
}
