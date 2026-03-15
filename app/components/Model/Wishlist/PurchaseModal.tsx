'use client'

import { purchaseWishlistItem } from '@/app/actions/wishlist'
import { motion, AnimatePresence } from 'framer-motion'
import { useActionState, useEffect } from 'react'
type WishlistItem = {
  id: number
  name: string
  price: number
  userId: number
  createdAt: Date
}

const PurchaseModal = ({ item, onClose, onSuccess }: { 
  item: WishlistItem
  onClose: () => void
  onSuccess: () => void
}) => {
   const [state, actionFunction, isPending] = useActionState(purchaseWishlistItem, null)

  useEffect(()=>{
    if(state?.success === true){
        
        onClose()
        onSuccess()
    } 
  },[state,onClose,onSuccess])


  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="bg-white px-10 py-10 max-w-md w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-green-700 font-medium mb-3">
              Confirm purchase
            </p>
            <h2 className="text-3xl font-light text-gray-900 mb-1">{item.name}</h2>
            <p className="text-green-600 text-sm mb-8">Rs {item.price.toLocaleString()}</p>

            <form action={actionFunction}>
              <input type="hidden" name="id" value={item.id} />

              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Category</p>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Electronics, Clothing..."
                  className="w-full border-b border-gray-300 text-sm text-gray-800 outline-none bg-transparent placeholder-gray-300 pb-1"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-green-600 hover:bg-green-700 text-white text-xs tracking-widest uppercase px-6 py-2 transition-colors"
                >
                  {isPending ? 'Processing...' : 'Confirm'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs uppercase tracking-widest text-gray-400 border border-gray-200 hover:bg-gray-50 px-6 py-2 transition-colors"
                >
                  Cancel
                </button>
              </div>
              {state?.message && (
                <p className="text-xs text-gray-400 mt-4">{state.message}</p>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PurchaseModal