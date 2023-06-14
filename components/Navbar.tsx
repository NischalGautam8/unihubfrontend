import React from "react";
import search from "../public/icons8-search-50.png";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function Navbar() {
  const [input, setInput] = useState("");
  const router = useRouter();
  return (
    <div className="">
      <div className="navbar__wrapper  flex   justify-between px-4 py-2 bg-black">
        {/* <div className="logo text-2xl font-bold">UNIHUB</div> */}
        <div className="login__signup ml-auto flex gap-8">
          <div className="relative">
            <Image
              onClick={() => {
                input.length > 0 && router.push(`/search?searchquery=${input}`);
              }}
              src={search}
              width={27}
              height={27}
              alt="search"
              className="absolute left-2 top-0.5 "
            />
            <input
              style={{ backgroundColor: "rgb(32, 35, 39)" }}
              type="text"
              placeholder="username"
              onChange={(e) => setInput(e.target.value)}
              className=" px-1 text-gray-200 py-1 pl-10 rounded-lg outline-none "
            />
          </div>
          <Link href={"/login"}>
            <h1 className="text-lg">Login</h1>
          </Link>
          <Link href={"/register"}>
            <h1 className="text-lg">Register</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
