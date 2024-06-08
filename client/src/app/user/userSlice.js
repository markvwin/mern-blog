import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

/*
  createSlice() is a function that takes an object as an argument and returns 
  a slice of the Redux state. The object contains the name of the slice, the 
  initial state, and the reducers.
*/

/* 
   In Redux Toolkit, a slice is a bundle of actions and reducer logic for 
   a specific feature in an app, usually defined in a single file. The name 
   comes from splitting the root Redux state object into multiple slices of 
   state. Slices help organize actions and reducers for specific state 
   sections. 
*/

/*
  action.payload typically refers to the data that is passed along with 
  an action
*/

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null; // if there was an error in the previous request, resets state
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload; // action.payload is the user object
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // action.payload is the error object
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

/*
Destructuring the `actions` object from the `userSlice` slice created using
`createSlice` from Redux Toolkit. This line allows us to directly access the
action creators signInFailure, signInStart, and signInSuccess so that they 
can be easily imported and dispatched in other parts of the application.
*/
export const {
  signInFailure,
  signInStart,
  signInSuccess,
  updateStart,
  updateFailure,
  updateSuccess,
} = userSlice.actions;

/*
  Exporting the reducer function from the `userSlice` slice created using 
  `createSlice` from Redux Toolkit. The reducer function is responsible for 
  specifying how the state should be updated in response to dispatched actions.
  By exporting it as the default export, other parts of the application can 
  import it and rename it. They'll use it to manage the state related to user 
  authentication within the Redux store.
*/
export default userSlice.reducer;
