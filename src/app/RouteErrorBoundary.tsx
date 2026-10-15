import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import { paths } from "./paths";

export function RouteErrorBoundary() {
  const error = useRouteError();

  let title = "Something went wrong";
  let detail = "Please try again.";

  if (isRouteErrorResponse(error)) {
    title = error.status === 404 ? "Not found" : `Error ${error.status}`;
    detail = typeof error.data === "string" ? error.data : error.statusText;
  } else if (error instanceof Error) {
    detail = error.message;
  }

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-500">{detail}</p>
      </div>
      <div>
        <Link to={paths.products} className="bg-blue-700 text-white px-4 py-3 rounded-md hover:bg-blue-800 cursor-pointer inline-block">
          Back to products
        </Link>
      </div>
    </div>
  );
}
