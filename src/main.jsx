import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ImageContextProvider } from "./contexts/ImageContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ImageContextProvider>
    <App />
  </ImageContextProvider>
);
