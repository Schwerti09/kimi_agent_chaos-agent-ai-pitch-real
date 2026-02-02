import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { env } from "./env";
import { prisma } from "./prisma";
const COOKIE_NAME = "aigov_session";

export function signToken(payload: object, expiresIn = "7d") {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
}
export function setSessionCookie(token: string) {
  cookies().set(COOKIE_NAME, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV==="production", path: "/", maxAge: 60*60*24*7 });
}
export function clearSessionCookie() { cookies().set(COOKIE_NAME, "", { httpOnly: true, path: "/", maxAge: 0 }); }

export async function requireUser() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    jwt.verify(token, env.JWT_SECRET);
    const session = await prisma.session.findFirst({
      where: { token, expiresAt: { gt: new Date() } },
      include: { user: { include: { organization: { include: { subscription: true } } } } },
    });
    if (!session?.user?.isActive) return null;
    return { token, session };
  } catch { return null; }
}
