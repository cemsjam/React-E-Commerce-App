import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";

import { SkeletonTheme } from "react-loading-skeleton";
import { routes } from "./routes/route";

import "@/styles/index.css";

import UserProvider from "./providers/user-provider";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	// <React.StrictMode>
	<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
		<SkeletonTheme baseColor="#f0f0f0" highlightColor="#e0e0e0">
			<RouterProvider router={router} />
		</SkeletonTheme>
		<UserProvider />
	</ClerkProvider>
	// </React.StrictMode>
);
