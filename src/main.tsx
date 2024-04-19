import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import {
  RouterProvider,
  createBrowserRouter as createRouter,
} from "react-router-dom";
import "./index.css";
import App from "./App";

const router = createRouter([
  {
    path: "",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
