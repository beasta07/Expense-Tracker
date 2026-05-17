"use client";

import { CATEGORY_OPTIONS } from "@/lib/editorial";
import { purchaseWishlistItem } from "@/app/actions/wishlist";
import { useActionState, useEffect } from "react";
import { WishlistItem } from "@/types";

const PurchaseModal = ({
  item,
  onClose,
  onSuccess,
}: {
  item: WishlistItem;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [state, actionFunction, isPending] = useActionState(purchaseWishlistItem, null);

  useEffect(() => {
    if (state?.success) {
      onSuccess();
    }
  }, [state, onSuccess]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4" onClick={onClose}>
      <div
        className="w-full max-w-md border border-[var(--color-ink)] bg-white p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="kicker mb-1">Confirm Purchase</div>
        <h2 className="headline mb-1 text-[22px]">{item.name}</h2>
        <div className="byline mb-4">रू {Math.round(item.price).toLocaleString()}</div>

        <form action={actionFunction}>
          <input type="hidden" name="id" value={item.id} />
          <label className="kicker mb-1 block">Category</label>
          <select name="category" className="paper-select">
            <option value="">Select</option>
            {CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <div className="mt-4 flex gap-2">
            <button type="submit" disabled={isPending} className="paper-button">
              {isPending ? "Processing..." : "Confirm"}
            </button>
            <button type="button" onClick={onClose} className="paper-button paper-button--secondary">
              Cancel
            </button>
          </div>

          {state?.message && (
            <div className="mt-3 text-[11px] text-[var(--color-ink-light)]" style={{ fontFamily: "var(--font-jetbrains)" }}>
              {state.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PurchaseModal;
