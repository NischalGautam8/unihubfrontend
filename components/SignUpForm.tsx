import React from "react";
import { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
function SignUpForm() {
  const [input, setInput] = useState({
    username: "",
    password: "",
    gender: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  console.log(input);
  const handleChange = (e: any) => {
    setInput((prev) => {
      return {
        ...prev,

        [e.target.name]: e.target.value,
      };
    });
  };
  const handleRegister = async () => {
    const res = await axios.post("http://localhost:5000/api/register", input);
    var hundred = new Date(new Date().getTime() + 100 * 864000 * 1000);
    cookie.set("acess_token", res.data.acess_token, { expires: 15 });
    cookie.set("refresh_token", res.data.refresh_token, { expires: hundred });
    console.log(res);
  };
  console.log(input);
  return (
    <div className=" w-full flex items-center justify-center ">
      <div className="flex flex-col w-full md:px-14">
        <h1 className="text-3xl mb-8">Please Login to Continue</h1>
        <label>Username</label>
        <input
          name="username"
          className="border-gray-600 border px-2 py-2"
          type="text"
          value={input.username}
          onChange={() => handleChange}
        />
        <label>Password</label>
        <input
          style={{ backgroundColor: "#f3e8ff" }}
          className="border-gray-600 border px-2 py-2"
          type="password"
          name="password"
          //   value={input.password}
          onChange={() => handleChange}
        />
        <label>FirstName</label>
        <input
          className="border-gray-600 border px-2 py-2"
          type="text"
          value={input.firstName}
          onChange={() => handleChange}
        />
        <label>LastName</label>
        <input
          style={{ backgroundColor: "#f3e8ff" }}
          className="border-gray-600 border px-2 py-2"
          type="password"
          onChange={() => handleChange}
        />
        <label>Gender</label>
        <select
          onChange={() => handleChange}
          className="py-3"
          style={{ color: "black" }}
          name="gender"
          id="gender"
        >
          <option style={{ color: "black" }} value="" defaultChecked disabled>
            Select Gender
          </option>
          <option style={{ color: "black" }} value="male">
            Male
          </option>
          <option style={{ color: "black" }} value="female">
            Female
          </option>
          <option style={{ color: "black" }} value="null">
            Prefer Not to say
          </option>
        </select>
        <label>Password</label>
        <input
          style={{ backgroundColor: "#f3e8ff" }}
          className="border-gray-600 border px-2 py-2"
          type="password"
          onChange={() => handleChange}
        />

        <div
          onClick={() => handleRegister()}
          style={{ backgroundColor: "rgb(95, 88, 231)" }}
          className=" login__button2 items-center flex justify-center mt-3 max-w-max px-9"
        >
          Sign Up
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;

///comment section //reply to comments
///room ma matrai msg //
