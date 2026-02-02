import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../lib/prisma";
import { signToken, setSessionCookie } from "../../../../lib/auth";

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"").slice(0,100);
}

export async function POST(req: Request) {
  const body = await req.json().catch(()=>null);
  const { email, password, name, organizationName } = body ?? {};
  if (!email || !password || !organizationName) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const org = await prisma.organization.create({ data: { name: organizationName, slug: slugify(organizationName), complianceConfig: {} } });
  const passwordHash = await bcrypt.hash(String(password), 12);
  const user = await prisma.user.create({ data: { email, passwordHash, name, role: "ADMIN", organizationId: org.id } });

  const trialEnd = new Date(); trialEnd.setDate(trialEnd.getDate() + 14);
  await prisma.subscription.create({ data: { organizationId: org.id, status: "TRIALING", tier: "STARTER", currentPeriodStart: new Date(), currentPeriodEnd: trialEnd } });

  const token = signToken({ userId: user.id, organizationId: org.id, role: user.role });
  await prisma.session.create({ data: { userId: user.id, token, expiresAt: new Date(Date.now() + 7*24*60*60*1000) } });
  setSessionCookie(token);
  return NextResponse.json({ ok: true });
}
