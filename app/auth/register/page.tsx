"use client";
import { useState } from "react";
import { Button, Card, Input } from "../../../components/ui";

export default function RegisterPage() {
  const [organizationName,setOrg]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [name,setName]=useState("");
  const [err,setErr]=useState<string|null>(null);
  const [loading,setLoading]=useState(false);

  async function submit(e:any){
    e.preventDefault();
    setErr(null); setLoading(true);
    const r = await fetch("/api/auth/register",{method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ organizationName, email, password, name })});
    const j = await r.json().catch(()=>({}));
    setLoading(false);
    if(!r.ok) return setErr(j?.error ?? "Registration failed");
    window.location.href="/dashboard";
  }

  return (
    <Card>
      <h1 className="text-xl font-semibold">Create account</h1>
      <p className="mt-1 text-sm text-zinc-400">14-day trial. No credit card needed.</p>
      <form onSubmit={submit} className="mt-6 space-y-3">
        <div><div className="mb-1 text-xs text-zinc-400">Organization</div><Input value={organizationName} onChange={e=>setOrg(e.target.value)} placeholder="Acme GmbH" /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><div className="mb-1 text-xs text-zinc-400">Name</div><Input value={name} onChange={e=>setName(e.target.value)} placeholder="Rolle" /></div>
          <div><div className="mb-1 text-xs text-zinc-400">Email</div><Input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" /></div>
        </div>
        <div><div className="mb-1 text-xs text-zinc-400">Password</div><Input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="min 8 chars" /></div>
        {err && <div className="text-sm text-red-400">{err}</div>}
        <Button disabled={loading} className="w-full">{loading ? "Creating..." : "Create account"}</Button>
      </form>
    </Card>
  );
}
