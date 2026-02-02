"use client";
import { useState } from "react";
import { Button, Card } from "../../../components/ui";

export default function DetectPage() {
  const [payload, setPayload] = useState<string>('{"url":"https://api.openai.com/v1/chat/completions","method":"POST","body":{"prompt":"My email is test@example.com and my card 4242 4242 4242 4242"}}');
  const [result, setResult] = useState<any>(null);
  const [err, setErr] = useState<string|null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setErr(null); setLoading(true); setResult(null);
    let parsed: any = null;
    try { parsed = JSON.parse(payload); } catch { parsed = payload; }
    const r = await fetch("/api/v1/detect", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ request: parsed }) });
    const j = await r.json().catch(()=>({}));
    setLoading(false);
    if (!r.ok) return setErr(j?.error ?? "Failed");
    setResult(j);
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <div className="text-lg font-medium">Analyze a request</div>
        <p className="mt-2 text-sm text-zinc-400">Paste JSON request data. We store an audit log + return a risk score.</p>
        <div className="mt-4">
          <div className="mb-1 text-xs text-zinc-400">Payload (JSON)</div>
          <textarea value={payload} onChange={e=>setPayload(e.target.value)} className="h-72 w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs outline-none focus:border-zinc-600" />
        </div>
        {err && <div className="mt-3 text-sm text-red-400">{err}</div>}
        <div className="mt-4 flex gap-3">
          <Button onClick={run} disabled={loading}>{loading ? "Analyzing..." : "Analyze"}</Button>
        </div>
      </Card>

      <Card>
        <div className="text-lg font-medium">Result</div>
        <p className="mt-2 text-sm text-zinc-400">Risk score, action and detected items.</p>
        <pre className="mt-4 h-96 overflow-auto rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs">
          {result ? JSON.stringify(result, null, 2) : "—"}
        </pre>
      </Card>
    </div>
  );
}
