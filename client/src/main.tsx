import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import {
  RouterProvider,
  createBrowserRouter as createRouter,
} from "react-router-dom";
import "./index.css";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ResultsPage from "./pages/ResultsPage";

const router = createRouter([
  {
    path: "",
    element: <StartPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "main",
    element: <MainPage />,
  },
  {
    path: "results",
    element: <ResultsPage results={{ test: "test" }} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
