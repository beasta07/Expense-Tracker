// components/SaulClassifiedAd.tsx
import Image from "next/image";

export default function SaulClassifiedAd() {
  return (
    <div className="py-4">
      <div
        style={{ fontFamily: "var(--font-im-fell)" }}
        className="grid grid-cols-2 border-[3px] border-double border-black  relative max-md:grid-cols-1"
      >
        {/* Ad number */}
        <span
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          className="absolute top-2 right-2 text-[8.5px] text-gray-400 tracking-widest z-10"
        >
          AD NO. 0047 — CLASSIFIEDS
        </span>

        {/* Left — copy */}
        <div className="flex flex-col gap-3 p-6 border-r-2 border-black max-md:border-r-0 max-md:border-b-2">
          <p
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            className="text-[9px] tracking-[0.18em] uppercase text-gray-500 border-b border-gray-300 pb-1"
          >
            Financial Counsel · Available Immediately · No Appointment Needed
          </p>

          <h2
            style={{ fontFamily: "var(--font-playfair)" }}
            className="text-[22px] font-black leading-tight text-black"
          >
            TROUBLED BY YOUR{" "}
            <span className="text-[#c0392b] italic">EXPENSES?</span>
            <br />
            IT&apos;S ALL GOOD, MAN.
          </h2>

          <hr className="border-t border-black" />

          <p className="text-[13.5px] leading-relaxed text-gray-800">
            Are <em>reckless spending habits</em> keeping you up at night? Has
            the stomach staged another uprising? Do you find yourself staring at
            a budget you don&apos;t remember setting?
            <br />
            <br />
            Our <em>Financial Correspondent</em> — a tireless, unpaid, and
            frankly overqualified intern — is available around the clock to
            field your most pressing fiscal inquiries.
            <br />
            <br />
            Ask about{" "}
            <em>spending patterns, category breakdowns, suspicious transactions</em>
            , or simply where it all went wrong.
          </p>

          <p className="text-center text-[12px] italic border-y border-gray-300 py-1" style={{ fontFamily: "var(--font-playfair)" }}>
            &ldquo;Better Call the Intern&rdquo; — satisfied clients, probably
          </p>

          <button
            className="mt-auto text-center text-[11px] font-bold tracking-wider uppercase hover:text-white bg-[#c0392b] border-2 border-black px-4 py-2.5 hover:bg-black "
        
          >
            → Consult the Correspondent
          </button>

          <p className="text-center text-[10.5px] italic text-gray-400">
            Available 24/7 · Judgment withheld · Results may vary
          </p>
        </div>

        {/* Right — image */}
        <div className="relative min-h-[260px] flex flex-col items-center justify-between  overflow-hidden ">
         <div
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
            className="relative z-10  text-[9.5px] tracking-widest uppercase text-[#faf8f2] bg-black border-t-2 border-[#c0392b] py-1 px-2 text-center w-full "
          >
            James M. McGill, Esq. · Your Financial Correspondent · Est. 2024
          </div>
          <Image
          width={813}
          height={577}
            src="/SaulGoodestMan.png"
            alt="Your financial correspondent"
            className=" p-6 object-contain "
          />
           <p className="text-xs leading-relaxed capitalize text-gray-800 pb-6 px-6 " >
 Not a single drop of your donation goes to waste. All funds are directed exclusively towards a fuller, more dignified photograph for this advertisement.
          </p>
          
        </div>
      </div>

      {/* Clip line */}
     
    </div>
  );
}