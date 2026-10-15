import { Link } from "react-router-dom";
import { paths } from "./paths";

export function NotFoundPage() {
  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <div>
        <Link to={paths.products} className="bg-blue-700 text-white px-4 py-3 rounded-md hover:bg-blue-800 cursor-pointer inline-block">
          Back to products
        </Link>
      </div>
    </div>
  );
}
