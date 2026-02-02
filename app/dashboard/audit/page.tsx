import { prisma } from "../../../lib/prisma";
import { requireUser } from "../../../lib/auth";
import { Card, Badge } from "../../../components/ui";

export default async function AuditPage() {
  const auth = await requireUser();
  if (!auth) return null;
  const orgId = auth.session.user.organizationId;

  const logs = await prisma.auditLog.findMany({ where: { organizationId: orgId }, orderBy: { detectedAt: "desc" }, take: 50 });

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-medium">Audit Logs</div>
          <div className="mt-1 text-sm text-zinc-400">Latest 50 events</div>
        </div>
        <Badge>{logs.length}</Badge>
      </div>

      <div className="mt-5 space-y-3">
        {logs.map(l => (
          <div key={l.id} className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm">{l.eventType} · <span className="text-zinc-400">{l.severity}</span></div>
              <div className="text-sm"><span className="text-zinc-400">risk</span> {l.riskScore} · <span className="text-zinc-400">{l.actionTaken}</span></div>
            </div>
            <div className="mt-1 text-xs text-zinc-500">{new Date(l.detectedAt).toISOString()} · {l.method ?? "—"} {l.endpoint ?? ""}</div>
            <details className="mt-3">
              <summary className="cursor-pointer text-xs text-zinc-300">Show data</summary>
              <pre className="mt-2 overflow-auto rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs">{JSON.stringify(l.data, null, 2)}</pre>
            </details>
          </div>
        ))}
        {logs.length===0 && <div className="text-sm text-zinc-400">No logs yet.</div>}
      </div>
    </Card>
  );
}
