import { ChakraProvider, defaultSystem, Theme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <Theme appearance="light" colorPalette="pink">
        <App />
      </Theme>
    </ChakraProvider>
  </React.StrictMode>
);
