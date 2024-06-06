import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./app/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./components/ThemeProvider.jsx";

/* 
  By wrapping the application by the React-Redux <Provider>, we make
  the redux store available to our react components.
*/

/* 
  By wrapping the application with the Redux-Persist <PersistGate> component, 
  we enable Redux Persist to persist and update the Redux store's current state to 
  and from local storage respectively. 
*/

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </PersistGate>
);
