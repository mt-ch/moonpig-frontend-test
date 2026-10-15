import { useEffect, useState } from "react";

import { getProduct } from "../../api/products";
import type { ProductDetail } from "../../api/types";

export function useProduct(id: string) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const controller = new AbortController();
    setProduct(null);
    setError(null);
    getProduct(id, controller.signal)
      .then(setProduct)
      .catch((e) => {
        if (!controller.signal.aborted) setError(e);
      });
    return () => controller.abort();
  }, [id]);

  return { product, error, loading: product === null && error === null };
}
