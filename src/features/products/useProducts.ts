import { useEffect, useState } from "react";

import { getProducts } from "../../api/products";
import type { ProductSummary } from "../../api/types";

export function useProducts() {
  const [products, setProducts] = useState<ProductSummary[] | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const controller = new AbortController();
    getProducts(controller.signal)
      .then(setProducts)
      .catch((e) => {
        if (!controller.signal.aborted) setError(e);
      });
    return () => controller.abort();
  }, []);

  return { products, error, loading: products === null && error === null };
}
