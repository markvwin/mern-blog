import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// if you have more than one reducer, you need to combine them into one reducer

const rootReducer = combineReducers({
  user: userReducer, // renaming userReducer to user
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // prevents redux-persist from throwing an error
});

export const persistor = persistStore(store);

/* Code for test redux_persist funcationality */

// const currentState = store.getState();

// // Inspect the state object to check for the presence of the _persist key
// if ("_persist" in currentState) {
//   console.log("Redux Persist is working correctly!");
// } else {
//   console.log("Redux Persist might not be configured correctly.");
// }

// // You can also log the entire state object for further inspection
// console.log("Current Redux Store State:", currentState);
