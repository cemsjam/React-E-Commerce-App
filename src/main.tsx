import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import "@/styles/index.css";

import { routes } from "./routes/route";
import Modal from "./components/modals/Modal";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //   <React.StrictMode>
  <>
    <Modal />
    <RouterProvider router={router} />
  </>
  //   </React.StrictMode>
);
