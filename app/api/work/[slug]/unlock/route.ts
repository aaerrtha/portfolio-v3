import { cookies } from "next/headers";
import { getProjectBySlug } from "@/lib/content";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import {
  canUnlockProject,
  createUnlockToken,
  getProjectPassword,
  getUnlockCookieOptions,
  isProjectPasswordProtected,
  safeCompareStrings,
} from "@/lib/work-auth";

interface UnlockRouteProps {
  params: Promise<{ slug: string }>;
}

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

export async function POST(request: Request, { params }: UnlockRouteProps) {
  const { slug } = await params;
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(`unlock:${slug}:${clientIp}`, MAX_ATTEMPTS, WINDOW_MS);

  if (!rateLimit.allowed) {
    return Response.json(
      { error: "Too many attempts. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds ?? 60),
        },
      },
    );
  }

  const project = getProjectBySlug(slug);

  if (!project || !isProjectPasswordProtected(project)) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  if (!canUnlockProject(slug)) {
    return Response.json({ error: "Authentication is not configured" }, { status: 503 });
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const expectedPassword = getProjectPassword(slug);
  if (!expectedPassword || !safeCompareStrings(password, expectedPassword)) {
    return Response.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = createUnlockToken(slug);
  if (!token) {
    return Response.json({ error: "Authentication is not configured" }, { status: 500 });
  }

  const cookieStore = await cookies();
  const cookie = getUnlockCookieOptions(slug, token);
  cookieStore.set(cookie);

  return Response.json({ success: true });
}
