"use client";
import { useEffect, useState } from "react";
import { Button, Card, Badge } from "../../../components/ui";

export default function BillingPage() {
  const [sub, setSub] = useState<any>(null);
  const [err, setErr] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    const r = await fetch("/api/billing/subscription");
    const j = await r.json().catch(()=>({}));
    if (!r.ok) { setErr(j?.error ?? "Failed"); return; }
    setSub(j.subscription);
  }
  useEffect(()=>{ load(); }, []);

  async function checkout(tier: "STARTER"|"PRO") {
    setErr(null); setLoading(true);
    const r = await fetch("/api/billing/checkout", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ tier, successUrl: window.location.origin + "/dashboard/billing", cancelUrl: window.location.href })});
    const j = await r.json().catch(()=>({}));
    setLoading(false);
    if (!r.ok) return setErr(j?.error ?? "Checkout failed");
    window.location.href = j.url;
  }

  async function portal() {
    setErr(null); setLoading(true);
    const r = await fetch("/api/billing/portal", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ returnUrl: window.location.href })});
    const j = await r.json().catch(()=>({}));
    setLoading(false);
    if (!r.ok) return setErr(j?.error ?? "Portal failed");
    window.location.href = j.url;
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-medium">Subscription</div>
            <div className="mt-1 text-sm text-zinc-400">Stripe optional; app works in trial mode without it.</div>
          </div>
          {sub && <Badge>{sub.tier} · {sub.status}</Badge>}
        </div>
        {err && <div className="mt-3 text-sm text-red-400">{err}</div>}
        <div className="mt-5 flex flex-wrap gap-3">
          <Button disabled={loading} onClick={()=>checkout("STARTER")}>Upgrade Starter</Button>
          <Button disabled={loading} onClick={()=>checkout("PRO")}>Upgrade Pro</Button>
          <Button disabled={loading} variant="ghost" onClick={portal}>Billing Portal</Button>
        </div>
        <div className="mt-4 text-xs text-zinc-500">Webhook endpoint: /api/stripe/webhook</div>
      </Card>
    </div>
  );
}
