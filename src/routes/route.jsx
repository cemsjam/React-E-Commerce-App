import Home from "@/pages/Home";
import Category from "@/pages/Category";
import App from "@/App";
import Product from "@/pages/ProductDetailPage/Product";

export const routes = [
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
