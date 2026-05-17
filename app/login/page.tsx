"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { logIn } from "../actions/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [state, loginAction, isPending] = useActionState(logIn, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) router.push("/");
  }, [state, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
      <div className="mb-8 w-full max-w-[420px] text-center">
        <hr className="rule-thick mb-4" />
        <h1 className="headline text-[32px]">प्रयोगकर्ताको हिसाब</h1>
        <p className="byline mt-1">Sign in to access your financial edition</p>
        <hr className="rule-standard mt-4" />
      </div>

      <div className="w-full max-w-[420px]">
        <div className="kicker mb-4">Correspondent Login</div>

        {state?.error && (
          <div className="mb-4 border border-[var(--color-accent)] bg-[var(--color-accent-bg)] px-3 py-2 text-[12px] text-[var(--color-accent)]" style={{ fontFamily: "var(--font-jetbrains)" }}>
            {state.error}
          </div>
        )}

        <form action={loginAction} className="space-y-4">
          <div>
            <label className="kicker mb-1 block">Email</label>
            <input type="email" name="email" placeholder="john@example.com" className="paper-input" required />
          </div>

          <div>
            <label className="kicker mb-1 block">Password</label>
            <input type="password" name="password" placeholder="••••••••" className="paper-input" required />
          </div>

          <button type="submit" disabled={isPending} className="paper-button w-full">
            {isPending ? "Submitting..." : "Enter Edition"}
          </button>
        </form>

        <p className="mt-6 text-[12px] text-[var(--color-ink-mid)]" style={{ fontFamily: "var(--font-im-fell)" }}>
          Need a fresh subscription?{" "}
          <Link href="/signup" className="text-[var(--color-accent)]">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
