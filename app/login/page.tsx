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
    
    <a    
          href="/api/auth/google"
          className="mb-4 flex w-full items-center justify-center gap-2 border border-black px-4 py-2.5 transition-colors hover:bg-black hover:text-white"
          style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", color: "inherit" }}
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.083 17.64 11.775 17.64 9.2z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
          </svg>
          Continue with Google
        </a>

        <div className="mb-4 flex items-center gap-3">
          <hr className="rule-standard flex-1" />
          <span className="text-[10px] tracking-widest text-[var(--color-ink-mid)]" style={{ fontFamily: "var(--font-jetbrains)" }}>or</span>
          <hr className="rule-standard flex-1" />
        </div>

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