import "./globals.css";
import React from "react";
export const metadata = { title: "AIGov — AI Governance SaaS", description: "Monitor, detect and audit risky AI usage." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><div className="min-h-screen">{children}</div></body></html>);
}
