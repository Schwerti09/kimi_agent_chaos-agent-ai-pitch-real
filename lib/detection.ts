import crypto from "crypto";

const aiPatterns: Record<string, string[]> = {
  OPENAI: ["api.openai.com/v1","chatgpt","gpt-4","gpt-3.5","text-davinci","moderation","embedding"],
  ANTHROPIC: ["api.anthropic.com","claude"],
  GOOGLE: ["generativelanguage.googleapis.com","gemini","bard","palm"],
  AZURE: ["openai.azure.com","cognitiveservices.azure.com","azure.ai"],
  OTHER: ["cohere.ai","huggingface.co","replicate.com","stability.ai","midjourney","github copilot"],
};

const sensitivePatterns: Record<string, RegExp> = {
  SSN: /\b\d{3}[-]?\d{2}[-]?\d{4}\b/g,
  CREDITCARD: /\b(?:\d[ -]*?){13,16}\b/g,
  EMAIL: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
  PHONE: /\b(?:\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/g,
  APIKEY: /\b(sk-|pk-|AKIA|ghp_|xox[bp]-)[A-Za-z0-9]{20,}\b/g,
  JWT: /\beyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\b/g,
};

const suspicious: Array<{pattern: RegExp; label: string; severity: "LOW"|"MEDIUM"|"HIGH"}> = [
  { pattern: /eval\(/gi, label: "Code Injection Attempt", severity: "HIGH" },
  { pattern: /<script>/gi, label: "XSS Attempt", severity: "HIGH" },
  { pattern: /union select/gi, label: "SQL Injection Attempt", severity: "HIGH" },
  { pattern: /\.\.\//gi, label: "Path Traversal Attempt", severity: "MEDIUM" },
];

function severityToScore(s: string) { return s==="CRITICAL"?100:s==="HIGH"?70:s==="MEDIUM"?30:10; }

export function analyzePayload(input: any) {
  const analysisId = crypto.randomUUID();
  const text = typeof input === "string" ? input : JSON.stringify(input ?? {});
  const threats: any[] = [];
  for (const s of suspicious) if (s.pattern.test(text)) threats.push({ type:"SECURITY_THREAT", threat:s.label, severity:s.severity, confidence:0.8 });

  const providers = new Set<string>();
  const lowText = text.toLowerCase();
  Object.entries(aiPatterns).forEach(([p, pats]) => { if (pats.some(pt => lowText.includes(pt.toLowerCase()))) providers.add(p); });

  const found: any[] = [];
  for (const [type, re] of Object.entries(sensitivePatterns)) {
    const matches = text.match(re);
    if (matches?.length) found.push({ type, count: matches.length, examples: matches.slice(0,3) });
  }

  let score = 0;
  score += threats.reduce((sum,t)=>sum+severityToScore(t.severity),0) * 0.35;
  score += (providers.size * 15) * 0.25;
  score += found.reduce((sum,f)=>sum + ((f.type==="CREDITCARD"||f.type==="SSN"||f.type==="APIKEY")?100:(f.type==="JWT"?70:30)) * f.count,0) * 0.35;
  score = Math.min(100, Math.round(score));

  const actionTaken = score>=80 ? "BLOCKED" : score>=50 ? "MASKED" : score>=30 ? "ALERTED" : "LOGGED";
  const severity = score>=80 ? "CRITICAL" : score>=50 ? "HIGH" : score>=30 ? "MEDIUM" : "LOW";
  return { analysisId, threats, providers: Array.from(providers), sensitive: found, riskScore: score, actionTaken, severity };
}
