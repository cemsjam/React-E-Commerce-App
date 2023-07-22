import Home from "@/pages/Home";
import Category from "@/pages/Category";
import App from "@/App";
import ProductPage from "@/pages/ProductDetailPage/ProductPage";
import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    handle: {
      crumb: true,
    },
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "/category/:categoryId",
        element: <Category />,
        handle: {
          crumb: true,
        },
      },
      {
        path: "/products/:productId",
        element: <ProductPage />,
        handle: {
          crumb: true,
        },
      },
    ],
  },
];
