import { NextResponse } from "next/server";
import { requireUser } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { analyzePayload } from "../../../../lib/detection";

function subAllowed(sub: any) {
  if (!sub) return false;
  const now = new Date();
  if (sub.currentPeriodEnd && new Date(sub.currentPeriodEnd) < now) return false;
  return ["ACTIVE","TRIALING"].includes(sub.status);
}

export async function POST(req: Request) {
  const auth = await requireUser();
  if (!auth) return NextResponse.json({ error: "Authentication required" }, { status: 401 });

  const orgId = auth.session.user.organizationId;
  const sub = await prisma.subscription.findUnique({ where: { organizationId: orgId } });
  if (!subAllowed(sub)) return NextResponse.json({ error: "Subscription inactive" }, { status: 403 });

  const body = await req.json().catch(()=>null);
  const request = body?.request;
  if (!request) return NextResponse.json({ error: "Request is required" }, { status: 400 });

  const analysis = analyzePayload(request);
  const eventType = analysis.sensitive.length ? "DATA_EXFILTRATION" : analysis.threats.length ? "PROMPT_INJECTION" : analysis.providers.length ? "API_CALL" : "USER_ACTIVITY";

  const log = await prisma.auditLog.create({
    data: {
      organizationId: orgId,
      userId: auth.session.user.id,
      eventType,
      severity: analysis.severity as any,
      endpoint: request?.url ?? null,
      method: request?.method ?? null,
      requestId: analysis.analysisId,
      data: request,
      maskedData: request,
      riskScore: analysis.riskScore,
      isBlocked: analysis.actionTaken === "BLOCKED",
      actionTaken: analysis.actionTaken as any,
    }
  });

  return NextResponse.json({ message: "Analysis complete", ...analysis, auditLogId: log.id });
}
