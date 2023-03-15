import React from "react";
import { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
function LoginForm() {
  const [username, setusename] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [err, setErr] = useState("");
  console.log(username, password);
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      var hundred = new Date(new Date().getTime() + 100 * 864000 * 1000);
      cookie.set("acess_token", res.data.acess_token, { expires: 15 });
      cookie.set("refresh_token", res.data.refresh_token, { expires: hundred });
      console.log(res);
      cookie.set("user", JSON.stringify(res.data.user), { expires: hundred });
      console.log(res);
    } catch (error) {
      console.log(error);
      setErr(error.response.data);
    }
  };
  return (
    <div className=" w-full flex items-center justify-center ">
      <div className="flex flex-col w-full md:px-14">
        {err && <h1>{err}</h1>}
        <h1 className="text-3xl mb-8">Please Login to Continue</h1>
        <label>Username</label>
        <input
          className="border-gray-600 border px-2 py-2"
          type="text"
          value={username}
          onChange={(e) => {
            setusename(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          style={{ backgroundColor: "#f3e8ff" }}
          className="border-gray-600 border px-2 py-2"
          type="password"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />

        <div
          onClick={() => handleLogin()}
          style={{ backgroundColor: "rgb(95, 88, 231)" }}
          className=" login__button2 items-center flex justify-center mt-3 max-w-max px-9"
        >
          Login{" "}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
