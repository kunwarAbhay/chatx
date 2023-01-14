import React, { useRef } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const rememberRef = useRef();

  const handleLogin = (e) => {};

  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center">
      <form className="max-w-2xl flex flex-col w-full text-2xl mb-8">
        <h1 className="text-6xl mb-10">Welcome Back</h1>
        <input
          type="text"
          ref={usernameRef}
          placeholder={"Enter your username"}
          className={"border-2 mb-6 p-4 text-2xl font-semibold rounded-lg"}
        />

        <input
          type="password"
          ref={passwordRef}
          placeholder={"Enter your password"}
          className={"border-2 mb-6 p-4 text-2xl font-semibold rounded-lg"}
        />

        <div className="flex justify-between mb-6">
          <label className="flex gap-2">
            <input type="checkbox" ref={rememberRef} className={"p-4"} />
            Remember me
          </label>
          <Link to={"/forgot-password"}>Forgot Password</Link>
        </div>

        <input
          type="submit"
          value="Sign in"
          onClick={handleLogin}
          className={"bg-black text-white p-4 rounded-lg"}
        />
      </form>

      <div className="text-2xl">
        <span>Don't have an account? </span>
        <Link to={"/signup"} className={"font-bold underline"}>
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
