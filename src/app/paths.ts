export const paths = {
  products: "/",
  product: (productId: string) => `/products/${encodeURIComponent(productId)}`,
} as const;
