"use client";

import { useActionState, useEffect } from "react";
import { signUp } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUp, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) router.push("/");
  }, [state, router]);

  return (
    <>
      {state?.error && (
        <div className="mb-4 border border-[var(--color-accent)] bg-[var(--color-accent-bg)] px-3 py-2 text-[12px] text-[var(--color-accent)]" style={{ fontFamily: "var(--font-jetbrains)" }}>
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label className="kicker mb-1 block">Email</label>
          <input type="email" name="email" placeholder="john@example.com" className="paper-input" required />
        </div>

        <div>
          <label className="kicker mb-1 block">Password</label>
          <input type="password" name="password" placeholder="••••••••" className="paper-input" required />
        </div>

        <button type="submit" disabled={isPending} className="paper-button w-full">
          {isPending ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </>
  );
}
