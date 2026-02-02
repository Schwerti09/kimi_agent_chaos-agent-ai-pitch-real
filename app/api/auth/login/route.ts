import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../lib/prisma";
import { signToken, setSessionCookie } from "../../../../lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(()=>null);
  const { email, password } = body ?? {};
  if (!email || !password) return NextResponse.json({ error: "Missing credentials" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const ok = await bcrypt.compare(String(password), user.passwordHash);
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  if (!user.isActive) return NextResponse.json({ error: "Account disabled" }, { status: 403 });

  const token = signToken({ userId: user.id, organizationId: user.organizationId, role: user.role });
  await prisma.session.create({ data: { userId: user.id, token, expiresAt: new Date(Date.now() + 7*24*60*60*1000) }});
  await prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() }});
  setSessionCookie(token);
  return NextResponse.json({ ok: true });
}
