import { screen } from "@testing-library/react";
import { AxiosError } from "axios";

import { getProduct } from "../../api/products";
import { renderWithRouter } from "../../test/renderWithRouter";
import ProductDetailPage from "./ProductDetailPage";

jest.mock("../../api/products");
const mockGetProduct = jest.mocked(getProduct);

const renderDetail = (id: string) => renderWithRouter(<ProductDetailPage />, { path: "/products/:productId", initialEntry: `/products/${id}` });

describe("ProductDetailPage", () => {
  it("renders the product details for the given id", async () => {
    mockGetProduct.mockResolvedValue({
      productNo: "42",
      title: "Birthday Card",
      descriptionHtml: "A <b>lovely</b> card",
      imageUrl: "https://example.com/42.jpg",
    });

    renderDetail("42");

    expect(await screen.findByRole("heading", { name: "Birthday Card" })).toBeInTheDocument();
    expect(screen.getByText("lovely")).toBeInTheDocument();
    expect(mockGetProduct).toHaveBeenCalledWith("42", expect.anything());
  });

  it("shows a not-found state when the product 404s", async () => {
    mockGetProduct.mockRejectedValue(new AxiosError("Not found", "ERR_BAD_REQUEST", undefined, undefined, { status: 404 } as never));

    renderDetail("missing");

    expect(await screen.findByRole("heading", { name: "Not found" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to products" })).toBeInTheDocument();
  });

  it("shows the error boundary when the fetch fails otherwise", async () => {
    mockGetProduct.mockRejectedValue(new Error("Boom"));

    renderDetail("42");

    expect(await screen.findByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Boom")).toBeInTheDocument();
  });
});
