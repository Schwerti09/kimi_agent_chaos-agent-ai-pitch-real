import Link from "next/link";
import { Card, Button, Badge } from "../components/ui";
export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="mb-3 flex gap-2">
            <Badge>EU AI Act ready-ish</Badge><Badge>Stripe Subscriptions</Badge><Badge>Audit Logs</Badge>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">AIGov</h1>
          <p className="mt-3 max-w-2xl text-zinc-300">Lightweight AI governance: detect risky prompts, sensitive data, and suspicious traffic. Generate audit logs and dashboards.</p>
          <div className="mt-8 flex gap-3">
            <Link href="/auth/register"><Button>Create account</Button></Link>
            <Link href="/auth/login"><Button variant="ghost">Sign in</Button></Link>
          </div>
        </div>
        <Card>
          <div className="text-sm text-zinc-300">Demo login</div>
          <div className="mt-2 text-sm"><span className="text-zinc-400">email:</span> admin@example.com</div>
          <div className="text-sm"><span className="text-zinc-400">pass:</span> admin1234</div>
          <div className="mt-4 text-xs text-zinc-400">Run: npx prisma db push && npm run db:seed</div>
        </Card>
      </div>
    </main>
  );
}
