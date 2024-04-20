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
import ConsultationPage from "./pages/ConsultationPage";
import ResultsPage from "./pages/ResultsPage";
import UserContextProvider from "./store/userContext";
import Authenticated from "./components/Authenticated";

const testResults = {
  FvnGj: "hzdeLbCI",
  Zmgyb: "IDPQhCnk",
  KjMQv: "GgPtlqTu",
  yWmCE: "YbQMRuIS",
  LYVpq: "qnlRehBg",
  lBiNe: "VPxUHklO",
  ZdheY: "BPhkjEjH",
  OLEuS: "WEiQoezp",
  SXIeR: "CyzxkxMO",
  zZnag: "gzeRTcaN",
  zlBKT: "tsXQHnJs",
  HnwQg: "IGmEGyDx",
  trcmA: "eDDfgbfI",
  QzZcF: "GExOTExP",
  xSCvN: "sbDIxyUT",
  YODNT: "LlCMqqxT",
  tpGiA: "WJZuqDni",
  YNijm: "tfBPyXnG",
  tEktE: "BXDMZruJ",
  ArfDH: "thBiRkYU",
  gkgJy: "gjxNPcqu",
  iCfdQ: "RJiPkvLx",
  LfRlx: "ZGnxjLZL",
  NVBJj: "eIViXkma",
  HFFGS: "TbXABFPG",
  KlfsG: "wWbYXZui",
  nKCGE: "ESyHZlDb",
  pjQmV: "gtqclLGt",
  FvgcC: "ZPODZpTw",
  GVQKP: "pILuhhHg",
  wYxgJ: "ufTGuNGM",
  VMEqK: "SddiQYzV",
  VzJHx: "DvHjDNHT",
  xzvgE: "GyQlWuQK",
  qJptQ: "hWFzHrOc",
  MnSDb: "EXBkCmAW",
  hrpHT: "QjxriMnT",
  jAhYh: "NRCNfPpd",
  VKcdQ: "hbWqUqQk",
  nLxeJ: "jTxFeIkT",
  znPTn: "cbfJUVzH",
  UvQTD: "IQXEcubV",
  KjQqQ: "hDXcDGoY",
  ZqcqF: "zgqilfeO",
  MwNEw: "DiwciFKX",
  qTPgd: "CIsyKWac",
  qKjLp: "fncXxhcz",
  JfcVh: "uORHwCgh",
  XbDmB: "ilDMnUvR",
  FCBsR: "YIDVtWyx",
  oqVje: "yrVucTwW",
  ijmUX: "fwTNXnwh",
  qbwPl: "OqmRlEcl",
  wnYrZ: "uBcNolLh",
  cNBJx: "LjLJbfQR",
  qMhbt: "LehZDCTp",
  pyFyB: "YZvyxOXZ",
  vHQtV: "tPgVsJZM",
  qNpsM: "NLDDuNAn",
  HmFzp: "jVdXIlzd",
  ZbPWT: "KtjWchkm",
  IkUjq: "XTcXSeXD",
  xFsPM: "lfvFvqzH",
  BrDYS: "KXmeUdjI",
  PBFZS: "rzFFRRXn",
  LklVI: "iYxkTATt",
  LjAip: "WnhcBwce",
  LhyCE: "KfknMEeI",
  DqMAs: "GWYUtLjL",
  FhAPl: "DYLDmWvh",
  kLXpM: "FhxzhZiD",
  ylQmP: "xjxDSJxC",
  pDkgR: "yCyYFuzE",
  bqIwr: "ESZiEtsn",
  hxpGS: "PHzqjQlY",
  xMMEU: "lJQjIVxX",
  WBZkf: "hBOLFWHr",
  kxdvC: "BTLgBWGk",
  ZrvhH: "ntKQydhQ",
  Qhpdh: "AdZDcbxX",
  ENjci: "McHgLlXD",
  mHfXO: "lcvpTzDF",
  HGXQb: "kzTfBkFe",
  QjzJn: "oBwQUhPP",
  RuNEh: "KIRzJjue",
  SHeTm: "xSVZDkSz",
  Kpvrz: "WIsNkGMu",
  TdDzh: "oXvQfBlp",
  KiklE: "npeivzHU",
  qNYVo: "WwOPeVQk",
  pJfbX: "SNGXtAqQ",
  EyvdI: "fdLmQYCs",
  IcuHS: "ZTtsqkzH",
  VrFXn: "jFVceNry",
  RExmp: "POTnpncK",
};

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
        <ResultsPage results={testResults} />,
      </Authenticated>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </NextUIProvider>
  </React.StrictMode>
);
