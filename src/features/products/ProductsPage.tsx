import { Link, useSearchParams } from "react-router-dom";

import { paths } from "../../app/paths";
import ProductCard from "../../components/productCard";
import Loader from "../../components/ui/loader";
import Pagination from "../../components/ui/pagination";
import { useProducts } from "./useProducts";

const PAGE_SIZE = 8;

export default function ProductsPage() {
  const { products, error, loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const cards = products ?? [];

  // Pagination
  const totalPages = Math.ceil(cards.length / PAGE_SIZE);
  const requestedPage = Number.parseInt(searchParams.get("page") ?? "", 10);
  const page = Math.min(Math.max(Number.isNaN(requestedPage) ? 1 : requestedPage, 1), Math.max(totalPages, 1));
  const pageCards = cards.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handlePageChange = (nextPage: number) => {
    setSearchParams(nextPage === 1 ? {} : { page: String(nextPage) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) throw error;
  if (loading) return <Loader />;
  if (cards.length === 0) return <p>No products found.</p>;

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex items-center gap-x-2">
        <h1 className="text-2xl font-semibold">All Products</h1>
        <span className="text-gray-500 text-base">({cards.length})</span>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
        {pageCards.map((card) => (
          <li key={card.productNo}>
            <Link to={paths.product(card.productNo)} className="w-full h-full cursor-pointer">
              <ProductCard card={card} />
            </Link>
          </li>
        ))}
      </ul>
      {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />}
    </div>
  );
}
