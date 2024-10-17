import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider, createHashRouter as createRouter } from "react-router-dom";
import "./index.css";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import ResultsPage from "./pages/ResultsPage";
import UserContextProvider from "./store/userContext";
import Authenticated from "./components/Authenticated";
import NotFoundPage from "./pages/NotFoundPage";
import ConsultationPage from "./pages/ConsultationPage";
import Layout from "./components/Layout";

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
    path: "consultation",
    element: (
      <Authenticated>
        <ConsultationPage />
      </Authenticated>
    ),
  },
  {
    path: "results",
    element: (
      <Authenticated>
        <ResultsPage />
      </Authenticated>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <UserContextProvider>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </UserContextProvider>
    </NextUIProvider>
  </React.StrictMode>
);
