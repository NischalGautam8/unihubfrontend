import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import cookie from "js-cookie";
import { AccountCircle, Search } from "@mui/icons-material";

function Navbar() {
  const [input, setInput] = useState("");
  const router = useRouter();
  let user;
  if(cookie.get('user')){
     user=JSON.parse(cookie.get('user')||"");
  }
  console.log(user);
  return (
    <div className="">
      <div className="navbar__wrapper  flex   justify-between px-4 py-2 bg-black items-center">
        {/* <div className="logo text-2xl font-bold">UNIHUB</div> */}
        <div className="login__signup ml-auto flex gap-8 items-center">
          <div className="relative">
            <Link href={`/search`}>
              <Search className="h-6 w-6"/>
            </Link>
          </div>
          
          {user?
          <Link href={`/profile/${user.userid}`}>
          <AccountCircle className="h-6 w-6"/></Link>:<Link href={"/login"}>
            <h1 className="text-lg">Login</h1>
          </Link>}
        </div>
      </div>
    </div>
  );
}
export default Navbar;
