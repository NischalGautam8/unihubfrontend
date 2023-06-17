import React from "react";
import Image from "next/image";
import pp from "../../public/pp.jpg";
import { useRouter } from "next/router";
function SingleUser({
  _id,
  firstName,
  lastName,
  username,
}: {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
}) {
  const router = useRouter();
  return (
    <div
      className="cursor-pointer"
      onClick={() => router.replace(`/profile/${_id}?user=${_id}`)}
    >
      <div className="flex pb-5 justify-between" key={_id}>
        <div className="flex items-center gap-3">
          <Image
            style={{
              borderRadius: "999px",
              objectFit: "cover",
              width: "50px",
              height: "50px",
            }}
            src={pp}
            className="rounded-full max-w-fit"
            alt="profile"
          ></Image>
          <div>
            <h1 className="text-lg font-bold text-white font-inter pb-0.5 ">
              {firstName + " "}
              {lastName}
            </h1>
            <h3 className="text-slate-500 ">{username}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleUser;
