import React from "react";
import Link from "next/link";
import { requireUser } from "../../lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = await requireUser();
  if (!auth) {
    return (
      <div className="mx-auto max-w-md px-6 py-16">
        <div className="text-lg font-medium">Not signed in</div>
        <Link className="mt-3 inline-block text-sm text-zinc-300 underline" href="/auth/login">Go to login</Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <header className="border-b border-zinc-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-sm text-zinc-300">AIGov</div>
          <nav className="flex gap-4 text-sm text-zinc-300">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/detect">Detect</Link>
            <Link href="/dashboard/audit">Audit</Link>
            <Link href="/dashboard/billing">Billing</Link>
            <Link href="/legal/privacy">Legal</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
