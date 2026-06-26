"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface CaseStudyGateProps {
  slug: string;
  title: string;
  subtitle: string;
}

export function CaseStudyGate({ slug, title, subtitle }: CaseStudyGateProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/work/${slug}/unlock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error ?? "Unable to unlock this case study");
        return;
      }

      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[480px] py-16 text-left">
      <p className="font-mono text-xs uppercase tracking-[0.06em] text-meta">Protected</p>
      <h1 className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.022em] text-foreground">
        {title}
      </h1>
      <p className="mt-4 text-[15px] leading-[1.6] text-body">{subtitle}</p>

      <form onSubmit={handleSubmit} className="mt-10">
        <label htmlFor="case-study-password" className="font-mono text-xs uppercase tracking-[0.06em] text-meta">
          Password
        </label>
        <input
          id="case-study-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
          className="mt-3 w-full rounded-lg border border-border bg-card px-4 py-3 text-[15px] text-foreground outline-none transition-colors focus:border-accent-amber"
        />

        {error && (
          <p className="mt-3 font-mono text-xs text-accent-amber" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || password.length === 0}
          className="mt-6 rounded-lg bg-foreground px-5 py-3 text-[15px] font-medium text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Unlocking…" : "Unlock case study"}
        </button>
      </form>
    </div>
  );
}
