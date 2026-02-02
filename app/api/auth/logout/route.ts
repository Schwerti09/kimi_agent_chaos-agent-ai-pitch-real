import { NextResponse } from "next/server";
import { requireUser, clearSessionCookie } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export async function POST() {
  const auth = await requireUser();
  if (auth?.token) await prisma.session.deleteMany({ where: { token: auth.token } });
  clearSessionCookie();
  return NextResponse.json({ ok: true });
}
