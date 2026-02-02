import { NextResponse } from "next/server";
import { requireUser } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  const auth = await requireUser();
  if (!auth) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const subscription = await prisma.subscription.findUnique({ where: { organizationId: auth.session.user.organizationId } });
  if (!subscription) return NextResponse.json({ error: "No subscription found" }, { status: 404 });
  return NextResponse.json({ subscription });
}
