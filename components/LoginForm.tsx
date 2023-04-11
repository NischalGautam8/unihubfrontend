import React from "react";
import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

function LoginForm() {
  const [username, setusename] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [err, setErr] = useState(" ");
  const toast = useToast();
  console.log(username, password);
  const router = useRouter();
  const user = cookie?.get("user");
  user && router.push("/");
  const handleLogin = async () => {
    try {
      const res: AxiosResponse = await axios.post(
        "http://localhost:5000/api/login",
        {
          username,
          password,
        }
      );

      var hundred = new Date(new Date().getTime() + 100 * 864000 * 1000);
      cookie.set("acess_token", res.data.acess_token, { expires: 15 });
      cookie.set("refresh_token", res.data.refresh_token, { expires: hundred });
      console.log(res);
      cookie.set("user", JSON.stringify(res.data.user), { expires: hundred });
      console.log(res);
      res.status == 200 && router.push("/");
    } catch (error: any) {
      setErr(error.response.data.err);
      console.log(error.response.data.err);
    }
  };
  return (
    <div className=" w-full flex items-center justify-center ">
      <div className="flex flex-col w-full md:px-14">
        <h1 className="text-3xl mb-8">Please Login to Continue</h1>
        {err && <h1 className="text-xl text-red-500	">{err}</h1>}
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
          onClick={() => {
            handleLogin();
            toast({
              title: "Account created.",
              description: "We've created your account for you.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          }}
          style={{ backgroundColor: "rgb(95, 88, 231)" }}
          className=" login__button2 items-center flex justify-center mt-3 max-w-max px-9 cursor-pointer"
        >
          Login
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
