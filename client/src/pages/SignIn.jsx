import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../app/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  // initializing the components
  const [formData, setFormData] = useState({});

  /*
  The useSelector hook from the Redux store accesses the 'user' slice from the 
  global state. By providing a selector function as an argument, which takes the entire 
  state as its parameter, we can specifically extract the 'loading' and 'error' properties 
  from the 'user' slice. 
  */

  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch(); // allows us to dispatch actions to the store

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"));
    }

    try {
      dispatch(signInStart()); // sets state.loading to true and state.error to null
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // converts JSON data to string before sending
      });
      const data = await res.json(); // converting response into JSON format
      if (data.success === false) {
        dispatch(signInFailure(data.message)); // error message if a duplicate username/email
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Mark's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign in with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Label
              className="flex-auto font-semibold text-xl"
              value="Sign in to your account"
            />
            <div>
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button // renders submit button and disables it when the user submits form
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {
                // because we are adding more than one http element, we need to wrap them in a empty fragment
                loading ? ( // displays loading animation via the spinner component
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign In"
                ) // if loading is true, displays "Loading..." otherwise default to "Sign Up"
              }
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && ( // displays an error alert if there is an error upon sign-up
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
