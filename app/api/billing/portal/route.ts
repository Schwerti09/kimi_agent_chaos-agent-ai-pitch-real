import { NextResponse } from "next/server";
import { requireUser } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { stripe } from "../../../../lib/stripe";

export async function POST(req: Request) {
  const auth = await requireUser();
  if (!auth) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  if (!stripe) return NextResponse.json({ error: "Stripe not configured" }, { status: 400 });

  const { returnUrl } = await req.json().catch(()=>({}));
  const org = await prisma.organization.findUnique({ where: { id: auth.session.user.organizationId } });
  if (!org?.stripeCustomerId) return NextResponse.json({ error: "No Stripe customer on org" }, { status: 400 });

  const session = await stripe.billingPortal.sessions.create({ customer: org.stripeCustomerId, return_url: returnUrl });
  return NextResponse.json({ url: session.url });
}
