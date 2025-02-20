import { useEffect, useState } from "react";
import { useCartStore } from "@/shared/store/useCartStore";

export function useCart() {
  const { cart, loadCart, addItem, updateItem, removeItem, clear } =
    useCartStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      await loadCart();
      setLoading(false);
    }
    fetchCart();
  }, [loadCart]);

  return { cart, loading, addItem, updateItem, removeItem, clear };
}
