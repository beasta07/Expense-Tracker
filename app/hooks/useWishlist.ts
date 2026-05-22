import { useEffect, useState } from "react";
import { getWishlistItems } from "../actions/wishlist";

const useWishlist = ( refreshTrigger: unknown) => {
    type WishlistItem = {
  id: number
  name: string
  price: number
  userId: number
  createdAt: Date
}
const [wishlistData, setWishlistData] = useState<WishlistItem[] | null>(null)
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Error | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWishlistItems();
        console.log(data?.items, "Here is the fetched in the wishlist");
        setWishlistData(data?.items ?? null);
      } catch (err) {
        setErrors(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [ refreshTrigger]);
  return { wishlistData, loading, errors };
};

export default useWishlist;
