import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./context/AuthContext";
import AppContextProvider from "./context/AppContext";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppContextProvider>
        <AuthContextProvider>
          <ToastContainer
            style={{ fontSize: "0.8rem", padding: "0.3rem" }}
            position="bottom-center"
            autoClose="3000"
            hideProgressBar="true"
            closeOnClick="true"
            pauseOnHover="true"
            draggable="true"
            progress="undefined"
            theme="colored"
          ></ToastContainer>
          <App />
        </AuthContextProvider>
      </AppContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
