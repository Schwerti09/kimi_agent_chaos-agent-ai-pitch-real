import React from "react";
export function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 shadow-sm">{children}</div>;
}
export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary"|"ghost" }) {
  const { variant="primary", className="", ...rest } = props;
  const base="rounded-xl px-4 py-2 text-sm font-medium transition";
  const v=variant==="primary" ? "bg-white text-black hover:bg-zinc-200" : "bg-transparent border border-zinc-800 hover:border-zinc-700";
  return <button className={`${base} ${v} ${className}`} {...rest} />;
}
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className="", ...rest } = props;
  return <input className={`w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-zinc-600 ${className}`} {...rest} />;
}
export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs">{children}</span>;
}
