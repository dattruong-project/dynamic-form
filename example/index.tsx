import React from "react";
import ReactDOM from 'react-dom/client';
import { FormsProvider } from "../src";
import DemoUI from "./demo";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <FormsProvider>
    <DemoUI />
  </FormsProvider>
);
