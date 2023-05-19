import React from "react";
import Link from "next/link";

function navbar() {
  return (
    <div className="">
      <div className="navbar__wrapper  flex   justify-between px-4 py-2 bg-black">
        {/* <div className="logo text-2xl font-bold">UNIHUB</div> */}
        <div className="login__signup ml-auto flex gap-8">
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

export default navbar;
