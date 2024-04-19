import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import {
  RouterProvider,
  createBrowserRouter as createRouter,
} from "react-router-dom";
import "./index.css";
import StartPage from "./pages/StartPage";

const router = createRouter([
  {
    path: "",
    element: <StartPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
