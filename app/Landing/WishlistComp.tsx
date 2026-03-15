"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useActionState, useState } from "react";
import useWishlist from "../hooks/useWishlist";
import { addWishlistItem, removeWishlistItem } from "../actions/wishlist";
import PurchaseModal from "../components/Model/Wishlist/PurchaseModal";
import type { ExpenseFormState } from "@/types";

type WishlistItem = {
  id: number
  name: string
  price: number
  userId: number
  createdAt: Date
}

const WishlistComp = ({ state, setExpenseRefresh }: { 
  state: ExpenseFormState
  setExpenseRefresh: (prev: (n: number) => number) => void
}) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [wishlistState, actionFunction] = useActionState(addWishlistItem, null);
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);

  const handleRemove = (id: number) => {
    removeWishlistItem(id);
    setRefreshTrigger(prev => prev + 1);
  };

  const { wishlistData, loading } = useWishlist(wishlistState, refreshTrigger);

  const handleSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
    setExpenseRefresh((prev) => prev + 1);
  };

  if (loading) return <div>Fetching wishlist...</div>;

  const items = wishlistData ?? [];

  return (
    <section className="bg-white px-8 md:px-24 py-24 border-t border-gray-100">
      <div className="flex items-start justify-between mb-12">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-green-700 font-medium mb-3">
            Wishlist
          </p>
          <h2 className="text-5xl font-light text-gray-900 leading-tight">
            {items.length === 0 ? (
              <>Nothing here <span className="italic text-green-600">yet.</span></>
            ) : (
              <>Your <span className="italic text-green-600">wishlist.</span></>
            )}
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            {items.length === 0
              ? "Add items you want to save for later."
              : `${items.length} item${items.length > 1 ? "s" : ""} saved`}
          </p>
        </div>
        <button
          onClick={() => setFormOpen((prev) => !prev)}
          className="bg-green-600 hover:bg-green-700 text-white text-xs tracking-widest uppercase px-6 py-2 transition-colors mt-2"
        >
          {formOpen ? "Cancel" : "+ Add item"}
        </button>
      </div>

      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <form action={actionFunction} className="flex gap-3 max-w-md mb-12">
              <input
                type="text"
                name="name"
                placeholder="Item name"
                className="flex-1 border-b border-gray-300 text-sm text-gray-800 outline-none bg-transparent placeholder-gray-300 pb-1"
              />
              <div className="flex items-center border-b border-gray-300 pb-1">
                <span className="text-gray-400 text-sm mr-1">Rs</span>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  className="w-24 text-sm text-gray-800 outline-none bg-transparent placeholder-gray-300"
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white text-xs tracking-widest uppercase px-6 py-2 transition-colors"
              >
                Save
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {items.length > 0 && (
        <div className="grid gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between border-b border-gray-100 pb-4"
            >
              <div>
                <p className="text-gray-900 font-light text-lg">{item.name}</p>
                <p className="text-green-600 text-sm">Rs {item.price.toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="text-xs uppercase tracking-widest text-green-600 border border-green-200 hover:bg-green-50 px-4 py-1.5 transition-colors"
                >
                  Purchased
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-xs uppercase tracking-widest text-gray-400 border border-gray-200 hover:bg-gray-50 px-4 py-1.5 transition-colors"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {selectedItem && (
        <PurchaseModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSuccess={() => handleSuccess()}
        />
      )}
    </section>
  );
};

export default WishlistComp;