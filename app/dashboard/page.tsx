import { prisma } from "../../lib/prisma";
import { requireUser } from "../../lib/auth";
import { Card, Badge } from "../../components/ui";

export default async function DashboardPage() {
  const auth = await requireUser();
  if (!auth) return null;
  const orgId = auth.session.user.organizationId;

  const since = new Date(Date.now() - 30*24*60*60*1000);
  const [total, high, recent] = await Promise.all([
    prisma.auditLog.count({ where: { organizationId: orgId, detectedAt: { gte: since }}}),
    prisma.auditLog.count({ where: { organizationId: orgId, detectedAt: { gte: since }, severity: { in: ["HIGH","CRITICAL"]}}}),
    prisma.auditLog.findMany({ where: { organizationId: orgId }, orderBy: { detectedAt: "desc" }, take: 8 })
  ]);

  const sub = await prisma.subscription.findUnique({ where: { organizationId: orgId }});
  return (
    <div className="space-y-6">
      <div>
        <div className="text-2xl font-semibold">Dashboard</div>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge>Org: {auth.session.user.organization.slug}</Badge>
          <Badge>Tier: {sub?.tier ?? "—"}</Badge>
          <Badge>Status: {sub?.status ?? "—"}</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card><div className="text-xs text-zinc-400">Events (30d)</div><div className="mt-2 text-2xl font-semibold">{total}</div></Card>
        <Card><div className="text-xs text-zinc-400">High risk (30d)</div><div className="mt-2 text-2xl font-semibold">{high}</div></Card>
      </div>

      <Card>
        <div className="text-sm font-medium">Recent audit logs</div>
        <div className="mt-4 space-y-3">
          {recent.map(l => (
            <div key={l.id} className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-950/40 p-3">
              <div>
                <div className="text-sm">{l.eventType} · <span className="text-zinc-400">{l.method ?? "—"} {l.endpoint ?? ""}</span></div>
                <div className="text-xs text-zinc-500">{new Date(l.detectedAt).toISOString()}</div>
              </div>
              <div className="text-sm"><span className="text-zinc-400">risk</span> {l.riskScore} · <span className="text-zinc-400">{l.severity}</span></div>
            </div>
          ))}
          {recent.length===0 && <div className="text-sm text-zinc-400">No logs yet. Go to Detect and submit a payload.</div>}
        </div>
      </Card>
    </div>
  );
}
