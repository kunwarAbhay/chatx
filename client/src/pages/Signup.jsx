import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const usernameRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignup = (e) => {};

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <form className=" max-w-2xl flex flex-col w-full text-2xl mb-8">
        <h1 className="text-6xl mb-10">Create an account</h1>
        <input
          type="text"
          ref={usernameRef}
          placeholder={"Enter your username"}
          className={"border-2 mb-6 p-4 text-2xl font-semibold rounded-lg"}
        />

        <input
          type="text"
          ref={nameRef}
          placeholder={"Enter your name"}
          className={"border-2 mb-6 p-4 text-2xl font-semibold rounded-lg"}
        />

        <input
          type="email"
          ref={emailRef}
          placeholder={"Enter your email"}
          className={"border-2 mb-6 p-4 text-2xl font-semibold rounded-lg"}
        />

        <input
          type="password"
          ref={passwordRef}
          placeholder={"Enter your password"}
          className={"border-2 mb-12 p-4 text-2xl font-semibold rounded-lg"}
        />

        <input
          type="submit"
          value="Sign up"
          onClick={handleSignup}
          className={"bg-black text-white p-4 rounded-lg"}
        />
      </form>

      <div className="text-2xl">
        <span>Already have an account? </span>
        <Link to={"/login"} className={"font-bold underline"}>
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Signup;
