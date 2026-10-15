import { screen } from "@testing-library/react";

import { getProducts } from "../../api/products";
import { renderWithRouter } from "../../test/renderWithRouter";
import ProductsPage from "./ProductsPage";

jest.mock("../../api/products");
const mockGetProducts = jest.mocked(getProducts);

describe("ProductsPage", () => {
  it("shows a loader, then renders the products", async () => {
    mockGetProducts.mockResolvedValue([
      { productNo: "1", title: "Birthday Card", imageUrl: "https://example.com/1.jpg" },
      { productNo: "2", title: "Anniversary Card", imageUrl: "https://example.com/2.jpg" },
    ]);

    renderWithRouter(<ProductsPage />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(await screen.findByAltText("Birthday Card")).toBeInTheDocument();
    expect(screen.getByAltText("Anniversary Card")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows an error message when the API rejects", async () => {
    mockGetProducts.mockRejectedValue(new Error("Network down"));

    renderWithRouter(<ProductsPage />);

    expect(await screen.findByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Network down")).toBeInTheDocument();
  });
});
