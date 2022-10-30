import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Theme from "./assets/styles/Theme";
import { BaseStyles, GlobalStyle } from "./assets/styles/GlobalStyle";
import { Toaster } from "react-hot-toast";

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <GlobalStyle />
      <BaseStyles />
      <div>
        <Toaster />
      </div>
      <App />
    </Theme>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals(console.log);
