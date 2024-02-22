import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider, useDispatch } from "react-redux";
import "./index.css";
import store from "./state/store.js";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import HomeContainer from "./pages/Home/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
