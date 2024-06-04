import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  /* By wrapping the application by the React-Redux <Provider>, we make
     the redux store available to our react components.*/
  <Provider store={store}>
    <App />
  </Provider>
);
