import type { RouteObject } from "react-router-dom";
import { AppLoading } from "./AppLoading";
import { NotFoundPage } from "./NotFoundPage";
import { RootLayout } from "./RootLayout";
import { RouteErrorBoundary } from "./RouteErrorBoundary";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: RootLayout,
    HydrateFallback: AppLoading,
    children: [
      {
        ErrorBoundary: RouteErrorBoundary,
        children: [
          {
            index: true, // products is the default page
            lazy: async () => {
              const { default: Component } = await import("../features/products/ProductsPage");
              return { Component };
            },
          },
          {
            path: "products/:productId",
            lazy: async () => {
              const { default: Component } = await import("../features/products/ProductDetailPage");
              return { Component };
            },
          },
        ],
      },
      { path: "*", Component: NotFoundPage },
    ],
  },
];
