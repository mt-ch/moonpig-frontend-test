import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import { RouteErrorBoundary } from "../app/RouteErrorBoundary";

// Mirrors the real route setup (page + route error boundary) without the lazy imports.
export function renderWithRouter(element: ReactElement, { path = "/", initialEntry = "/" } = {}) {
  const router = createMemoryRouter([{ path, element, ErrorBoundary: RouteErrorBoundary }], {
    initialEntries: [initialEntry],
  });
  return render(<RouterProvider router={router} />);
}
