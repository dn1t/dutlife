import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages";
import Search from "./pages/search";

import "./fonts.css";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Index /> },
  { path: "/search", element: <Search /> },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  </React.StrictMode>
);
