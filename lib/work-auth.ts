import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { ProjectFrontmatter } from "./types";

const COOKIE_PREFIX = "work-unlock-";
const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function getAuthSecret(): string | undefined {
  return process.env.WORK_AUTH_SECRET;
}

export function getPasswordEnvKey(slug: string): string {
  return `WORK_PASSWORD_${slug.replace(/-/g, "_").toUpperCase()}`;
}

export function getProjectPassword(slug: string): string | undefined {
  const value = process.env[getPasswordEnvKey(slug)];
  return value && value.length > 0 ? value : undefined;
}

export function isProjectPasswordProtected(
  project: Pick<ProjectFrontmatter, "passwordProtected">,
): boolean {
  return Boolean(project.passwordProtected);
}

export function canUnlockProject(slug: string): boolean {
  return Boolean(getAuthSecret() && getProjectPassword(slug));
}

export function createUnlockToken(slug: string): string | null {
  const secret = getAuthSecret();
  if (!secret) {
    return null;
  }

  const expiry = Date.now() + TOKEN_MAX_AGE_SECONDS * 1000;
  const payload = `${slug}:${expiry}`;
  const signature = createHmac("sha256", secret).update(payload).digest("hex");
  return `${expiry}.${signature}`;
}

export function verifyUnlockToken(slug: string, token: string): boolean {
  const secret = getAuthSecret();
  if (!secret) {
    return false;
  }

  const [expiryStr, signature] = token.split(".");
  if (!expiryStr || !signature) {
    return false;
  }

  const expiry = Number(expiryStr);
  if (!Number.isFinite(expiry) || Date.now() > expiry) {
    return false;
  }

  const payload = `${slug}:${expiry}`;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");

  try {
    return timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

export function getUnlockCookieName(slug: string): string {
  return `${COOKIE_PREFIX}${slug}`;
}

export async function isProjectUnlocked(slug: string): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(getUnlockCookieName(slug))?.value;
  if (!token) {
    return false;
  }
  return verifyUnlockToken(slug, token);
}

export function getUnlockCookieOptions(slug: string, token: string) {
  return {
    name: getUnlockCookieName(slug),
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: TOKEN_MAX_AGE_SECONDS,
    path: `/work/${slug}`,
  };
}

export function safeCompareStrings(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);

  if (bufferA.length !== bufferB.length) {
    timingSafeEqual(bufferA, bufferA);
    return false;
  }

  return timingSafeEqual(bufferA, bufferB);
}
