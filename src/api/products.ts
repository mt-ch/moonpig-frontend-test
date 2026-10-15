import { client } from "./client";
import type { ProductDetail, ProductResponse, ProductSummary, SearchResponse } from "./types";

export async function getProducts(signal?: AbortSignal): Promise<ProductSummary[]> {
  const { data } = await client.get<SearchResponse>("/search.json", { signal });
  return data.Products.map((product) => ({
    productNo: product.MoonpigProductNo,
    title: product.Title,
    imageUrl: product.ProductImage.Link.Href,
  }));
}

export async function getProduct(id: string, signal?: AbortSignal): Promise<ProductDetail> {
  const { data } = await client.get<ProductResponse>(`/product/${encodeURIComponent(id)}.json`, { signal });
  return {
    productNo: data.MoonpigProductNo,
    title: data.Title,
    descriptionHtml: data.Description,
    imageUrl: data.ImageUrls[0]?.ImageUrl ?? null,
  };
}
