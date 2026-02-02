import React from "react";
import Link from "next/link";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-md px-6 py-14">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="text-sm text-zinc-300 hover:text-white">← Home</Link>
        <div className="text-sm text-zinc-500">AIGov</div>
      </div>
      {children}
    </div>
  );
}
