import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./fonts.css";
import "./index.css";
import Index from "./pages";
import Search from "./pages/search";

const router = createBrowserRouter([
  { path: "/", element: <Index /> },
  { path: "/search", element: <Search /> },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
