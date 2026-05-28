"use client";

import { useState } from "react";
import {  removeWishlistItem } from "../actions/wishlist";;
import PurchaseModal from "../components/Model/Wishlist/PurchaseModal";
import { WishlistItem } from "@/types";

type Props = {
  onExpenseRefresh: () => void;
  wishlistFormState: { success: boolean; message: string; data?: { name: string; price: string; userId: number } } | null;
  wishlistAction: (payload: FormData) => void;
  wishlistPending: boolean;
  wishlistData: WishlistItem[] | null;
  wishlistLoading: boolean;
wishlistErrors: Error | null;
  setWishlistRefresh: React.Dispatch<React.SetStateAction<number>>;
   onNavigate: (page: "front" | "desk") => void 
}

const WishlistComp = ({
  onExpenseRefresh,wishlistFormState,wishlistAction,wishlistPending,wishlistData,setWishlistRefresh,wishlistLoading,onNavigate
}: 
 Props
) => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);
  

  const items = wishlistData ?? [];
  const totalWishlistValue = items.reduce((sum, item) => sum + item.price, 0);

  const handleRefresh = () => {
    setWishlistRefresh((prev) => prev + 1);
  };

   
  const handleRemove = async (id: number) => {
    await removeWishlistItem(id);
    handleRefresh();
  };

  return (
    <div id="financial-desk">
      <div className="kicker mb-1">Wishlist Intelligence</div>
      <hr className="rule-standard mb-2" />
      <div className="headline mb-1.5 text-[18px]">
        {items.length} Item{items.length !== 1 ? "s" : ""} Await Fiscal Approval
      </div>
      <div className="body-copy mb-2.5">
        The wishlist committee reports pending acquisitions valued at रू {Math.round(totalWishlistValue).toLocaleString()} total.
      </div>

      <button
        type="button"
        onClick={() => setFormOpen((prev) => !prev)}
        className="mb-2 border border-[var(--color-ink)] px-2.5 py-1 text-[10px] uppercase hover:bg-[var(--color-ink)] hover:text-white"
        style={{ fontFamily: "var(--font-jetbrains)", letterSpacing: "2px" }}
      >
        {formOpen ? "Close Filing" : "Add Item"}
      </button>

      {formOpen && (
        <form action={wishlistAction} className="mb-3 border border-[var(--color-ink)] bg-[var(--color-paper-tint)] p-2.5">
          <div className="mb-2">
            <label className="kicker mb-1 block">Item Name</label>
            <input type="text" name="name" className="paper-input" />
          </div>
          <div>
            <label className="kicker mb-1 block">Price</label>
            <input type="number" name="price" className="paper-input" style={{ fontFamily: "var(--font-jetbrains)" }} />
          </div>
          <button type="submit" disabled={wishlistPending} className="paper-button mt-2 w-full">
            {wishlistPending ? "Saving..." : "Save Item"}
          </button>
          {wishlistFormState?.message && (
            <div className="mt-2 text-[11px] text-[var(--color-ink-light)]" style={{ fontFamily: "var(--font-jetbrains)" }}>
              {wishlistFormState.message}
            </div>
          )}
        </form>
      )}

   {wishlistLoading ? (
  <div className="flex flex-col gap-2">
    {[1, 2, 3].map((i) => (
      <div key={i} className="border-t border-[var(--color-rule-light)] py-2">
        <div className="animate-pulse bg-gray-200 mb-1.5" style={{ width: "65%", height: "14px" }} />
        <div className="flex items-center justify-between gap-2">
          <div className="animate-pulse bg-gray-200" style={{ width: "40%", height: "11px" }} />
          <div className="flex gap-2">
            <div className="animate-pulse bg-gray-200" style={{ width: "55px", height: "11px" }} />
            <div className="animate-pulse bg-gray-200" style={{ width: "40px", height: "11px" }} />
          </div>
        </div>
      </div>
    ))}
  </div>
) : items.length === 0 ? (
        <div className="border-t border-[var(--color-rule-light)] py-2 text-[12px] text-[var(--color-ink-mid)]" style={{ fontFamily: "var(--font-im-fell)" }}>
          No pending acquisitions are listed in the current edition.
        </div>
      ) : (
        items.map((item) => (
          <div key={item.id} className="border-t border-[var(--color-rule-light)] py-2">
            <div className="text-[13px] text-[var(--color-ink)]" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}>
              {item.name}
            </div>
            <div className="mt-0.5 flex items-center justify-between gap-2 text-[11px] text-[var(--color-ink-light)]" style={{ fontFamily: "var(--font-jetbrains)" }}>
              <span>रू {Math.round(item.price).toLocaleString()} · pending</span>
              <div className="flex gap-2">
                <button type="button" onClick={() => setSelectedItem(item)} className="hover:text-[var(--color-accent)]">
                  Purchased
                </button>
                <button type="button" onClick={() => handleRemove(item.id)} className="hover:text-[var(--color-accent)]">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      )}
<div className="mt-3">
  <hr className="rule-standard mb-2" />
  <div style={{ borderTop: "2px solid var(--color-ink)", borderBottom: "1px solid var(--color-ink)" }} className="mb-1.5 py-[2px]">
    <span className="kicker">Ask the Desk</span>
  </div>

  <div className="border border-[var(--color-ink)] bg-[var(--color-paper-tint)] p-2">
    <div className="mb-2 text-[11px] italic text-[var(--color-ink-mid)]" style={{ fontFamily: "var(--font-im-fell)", lineHeight: 1.5 }}>
      He has seen your numbers. He has questions.
    </div>
    <button
      type="button"
      onClick={() => onNavigate("desk")}
      className="w-full border border-[var(--color-ink)] bg-[var(--color-ink)] px-2 py-1.5 text-[8px] uppercase text-white hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]"
      style={{ fontFamily: "var(--font-jetbrains)", letterSpacing: "2px" }}
    >
      → Face the Music
    </button>
  </div>

  <div className="mt-1 text-center text-[7px] uppercase tracking-widest text-[var(--color-ink-light)]" style={{ fontFamily: "var(--font-jetbrains)" }}>
    Intern not liable for your choices
  </div>
</div>

      {selectedItem && (
        <PurchaseModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSuccess={() => {
            setSelectedItem(null);
            handleRefresh();
            onExpenseRefresh();
          }}
        />
      )}
    </div>
  );
};

export default WishlistComp;
