import React from "react";
import search from "../public/icons8-search-50.png";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import cookie from "js-cookie";

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
              <Image
                src={search}
                width={27}
                height={27}
                alt="search"
                className=" left-2 top-0.5 hover:color-white cursor-pointer  "
              />
            </Link>
          </div>
          
          {user?
          <Link href={`/profile/${user.userid}`}>
          <Image className=" rounded-full" width={30} height={38} alt="dp" src={user.image?user.image:"https://res.cloudinary.com/ds8b7v9pf/image/upload/v1693024196/676-6764065_default-profile-picture-transparent-hd-png-download_zaar0i.png"}/></Link>:<Link href={"/login"}>
            <h1 className="text-lg">Login</h1>
          </Link>}
        </div>
      </div>
    </div>
  );
}
export default Navbar;
