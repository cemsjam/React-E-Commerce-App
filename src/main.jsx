import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import "@/styles/index.css";
import { ShoppingCartContextProvider } from "./context/ShoppingCartContext";
import { OffcanvasContextProvider } from "./context/OffcanvasContext";
import { routes } from "./routes/route";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <OffcanvasContextProvider>
    <ShoppingCartContextProvider>
      <RouterProvider router={router} />
    </ShoppingCartContextProvider>
  </OffcanvasContextProvider>
);
