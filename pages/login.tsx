import React from "react";
import Image from "next/image";
import art from "../public/art.jpg";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "@/components/SignUpForm";
function Login() {
  const [chooseLogin, setChooseLogin] = useState(false);
  const [chooseRegister, setChooseRegister] = useState(false);
  console.log(chooseLogin, chooseRegister);
  return (
    <div
      style={{ backgroundColor: "black" }}
      className="bg__black wrapper flex min-h-screen pl-3 "
    >
      <Image src={art} className="w-1/2 object-cover" alt="art" />
      {!chooseLogin && !chooseRegister && (
        <div className="content__section  flex  flex-col justify-center  w-full">
          <h1 className="font-ubuntu  font-bold text-7xl tracking-widest pl-3 mb-10">
            Happening now
          </h1>
          <h1 className="text-4xl font-bold mb-6 text-start w-full pl-3">
            Join Unihub today
          </h1>
          <div
            style={{ width: "60%" }}
            className="btns pl-3   flex flex-col  gap-3"
          >
            <button
              onClick={() => {
                setChooseLogin(false);
                setChooseRegister(true);
              }}
              className="signup__button  py-1 px-20  "
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                setChooseRegister(false);
                setChooseLogin(true);
              }}
              className="login__button py-1   px-20"
            >
              Login
            </button>
          </div>
        </div>
      )}
      {chooseLogin && <LoginForm />}
      {chooseRegister && <SignUpForm />}
    </div>
  );
}
export default Login;
