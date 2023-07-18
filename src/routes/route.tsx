import Home from "@/pages/Home";
import Category from "@/pages/Category";
import App from "@/App";
import Product from "@/pages/ProductDetailPage/Product";
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
        element: <Product />,
        handle: {
          crumb: true,
        },
      },
    ],
  },
];
