"use client";

type FinancialDeskPageProps = {
  userName: string;
};

const SUGGESTIONS = [
  "Where did most of my money go this month?",
  "Am I on track with my budget?",
  "What should I cut to save रू 2,000?",
  "Compare this month to last month",
  "Which category is growing fastest?",
  "Can I afford my wishlist items?",
];

export default function FinancialDeskPage({
  userName,
}: FinancialDeskPageProps) {
  return (
    <main className="mx-auto min-h-screen max-w-[900px] bg-white px-4 py-4 md:px-6">
      <div className="mb-6 flex items-center justify-between gap-2 border-b border-t-4 border-[var(--color-ink)] py-1">
        <span className="kicker">Inside Page</span>
        <span className="kicker text-[var(--color-accent)]">
          ● The Financial Desk
        </span>
        <span className="kicker">AI · Pending</span>
      </div>

      <div className="mb-6">
        <h1 className="headline mb-1 text-[32px]">The Financial Desk</h1>
        <div className="byline">
          For {userName} · Your personal expense analyst on call
        </div>
      </div>

      <div className="mb-6 border border-[var(--color-ink)] bg-[var(--color-paper-tint)] p-3">
        <div className="kicker mb-2">Context Loaded</div>
        <div
          className="grid gap-2 text-[12px] text-[var(--color-ink-mid)] md:grid-cols-3"
          style={{ fontFamily: "var(--font-jetbrains)" }}
        >
          <span>Expenses: current edition</span>
          <span>Total: live ledger data</span>
          <span>Budget: monthly filing</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="kicker mb-2">Suggested Dispatches</div>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((question) => (
            <button
              key={question}
              type="button"
              className="border border-[var(--color-ink)] px-3 py-1.5 text-[12px] hover:bg-[var(--color-ink)] hover:text-white"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <div className="border border-[var(--color-ink)]">
        <div className="border-b border-[var(--color-ink)] px-3 py-2">
          <div className="kicker">Desk Transcript</div>
        </div>

        <div className="space-y-4 p-3">
          <div className="pr-8">
            <div className="kicker mb-1">— Financial Desk · AI</div>
            <div
              className="border border-[var(--color-rule-light)] bg-[var(--color-paper-tint)] p-3 text-[14px]"
              style={{ fontFamily: "var(--font-im-fell)" }}
            >
              The desk is not yet taking live questions, but the room is ready.
              When connected, this page will read like an interview transcript
              about your money.
            </div>
          </div>

          <div className="pl-8">
            <div className="kicker mb-1">— You · Correspondent</div>
            <div
              className="border border-[var(--color-ink)] bg-white p-3 text-[14px]"
              style={{ fontFamily: "var(--font-im-fell)" }}
            >
              Where did my money go this month?
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t-4 border-[var(--color-ink)] pt-4">
        <div className="kicker mb-2">Send Dispatch</div>
        <div className="flex gap-2">
          <input
            placeholder="Ask about your spending..."
            disabled
            className="flex-1 border border-[var(--color-ink)] px-3 py-2.5 text-[13px] bg-white"
            style={{ fontFamily: "var(--font-im-fell)" }}
          />
          <button
            type="button"
            disabled
            className="bg-[var(--color-accent)] px-5 py-2.5 text-[11px] font-bold uppercase text-white disabled:opacity-60"
            style={{ fontFamily: "var(--font-jetbrains)", letterSpacing: "2px" }}
          >
            Soon
          </button>
        </div>
      </div>

      <footer className="mt-10 flex flex-col gap-2 border-t border-[var(--color-ink)] py-4 md:flex-row md:items-center md:justify-between">
        <span className="kicker">{userName} को हिसाब · Financial Desk</span>
        <span className="kicker text-[var(--color-accent)]">
          Powered by AI · Pending
        </span>
        <span className="kicker">Inside Edition</span>
      </footer>
    </main>
  );
}