import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../redux/Slices/loggedSlice";

function Login() {
  const navigate = useNavigate();
  const { isLogged } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [errorMessages, setErrorMessages] = useState({});
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");

  // User Login info
  const database = [
    {
      username: "user",
      password: "1",
    },
  ];

  const errors = {
    uname: "Invalid username",
    pass: "Invalid password",
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = database.find((user) => user.username === uname);

    if (userData) {
      if (userData.password !== pass) {
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        dispatch(logIn(true));
        setTimeout(function () {
          navigate("/products");
        }, 1000);
      }
    } else {
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  const logout = () => {
    dispatch(logIn(false));
  };

  const backToHome = () => {
    navigate("/products");
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div data-testid="error-mess" className="error">
        {errorMessages.message}
      </div>
    );

  const renderForm = (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700">
          Sign in
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Username
            </label>
            <input
              aria-label="uname"
              type="text"
              name="uname"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
              onChange={(e) => {
                setUname(e.target.value);
              }}
            />
            {renderErrorMessage("uname")}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              aria-label="pwd"
              type="password"
              name="pass"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
            {renderErrorMessage("pass")}
          </div>
          <div className="mt-6">
            <input
              data-testid="submit"
              type="submit"
              className="w-full px-4 py-2 cursor-pointer hover:bg-purple-700 hover:text-white transition duration-200 ease-in text-purple-700 border-2 border-purple-700 rounded-lg font-semibold"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );

  const logged = (
    <>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          User is successfully logged in
          <div className="px-1">
            <div className="flex -mx-2">
              <div className="w-1/3 mt-5">
                <button
                  data-testid="back-home"
                  onClick={backToHome}
                  className="hover:bg-purple-700 hover:text-white transition duration-200 ease-in text-purple-700 border-2 border-purple-700 rounded-lg font-semibold py-2 px-4"
                >
                  Back to Shop
                </button>
              </div>
              <div className="w-1/3 mt-5">
                <button
                  data-testid="logout"
                  onClick={logout}
                  className="hover:bg-purple-700 hover:text-white transition duration-200 ease-in text-purple-700 border-2 border-purple-700 rounded-lg font-semibold py-2 px-4"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="login">
      <div className="login-form">{isLogged ? logged : renderForm}</div>
    </div>
  );
}

export default Login;
