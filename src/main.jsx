import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import "@/styles/index.css";

import { routes } from "./routes/route";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
