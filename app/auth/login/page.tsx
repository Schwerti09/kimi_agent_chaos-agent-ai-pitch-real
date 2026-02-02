"use client";
import { useState } from "react";
import { Button, Card, Input } from "../../../components/ui";

export default function LoginPage() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState<string|null>(null);
  const [loading,setLoading]=useState(false);

  async function submit(e: any) {
    e.preventDefault();
    setErr(null); setLoading(true);
    const r = await fetch("/api/auth/login", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ email, password })});
    const j = await r.json().catch(()=>({}));
    setLoading(false);
    if (!r.ok) return setErr(j?.error ?? "Login failed");
    window.location.href="/dashboard";
  }

  return (
    <Card>
      <h1 className="text-xl font-semibold">Sign in</h1>
      <p className="mt-1 text-sm text-zinc-400">Access your governance dashboard.</p>
      <form onSubmit={submit} className="mt-6 space-y-3">
        <div><div className="mb-1 text-xs text-zinc-400">Email</div><Input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" /></div>
        <div><div className="mb-1 text-xs text-zinc-400">Password</div><Input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" /></div>
        {err && <div className="text-sm text-red-400">{err}</div>}
        <Button disabled={loading} className="w-full">{loading ? "Signing in..." : "Sign in"}</Button>
      </form>
    </Card>
  );
}
