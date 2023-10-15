import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Astar } from "@thirdweb-dev/chains";
import "./styles/globals.css";
import { AuthProvider } from "./context/AuthContext";
import { PlayProvider } from "./context/PlayContext";

const container = document.getElementById("root");
const root = createRoot(container!);

const renderApp = () => (
  <React.StrictMode>
    <ThirdwebProvider activeChain={Astar}>
      <AuthProvider>
        <PlayProvider>
          <App />
        </PlayProvider>
      </AuthProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);

root.render(renderApp());

reportWebVitals();
