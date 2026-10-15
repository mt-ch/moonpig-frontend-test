export interface ProductSummary {
  productNo: string;
  title: string;
  imageUrl: string;
}

export interface ProductDetail {
  productNo: string;
  title: string;
  descriptionHtml: string;
  imageUrl: string | null;
}

export interface SearchResponse {
  Products: {
    MoonpigProductNo: string;
    Title: string;
    ProductImage: { Link: { Href: string } };
  }[];
}

export interface ProductResponse {
  MoonpigProductNo: string;
  Title: string;
  Description: string;
  ImageUrls: { ImageUrl: string }[];
}
