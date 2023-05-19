import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SinglePost from "./SinglePost";
import { postinterface } from "@/interfaces/postinterface";
import { userinterface } from "@/interfaces/userinterface";

export default function Posts({
  data,
  currentUser,
}: {
  data: Array<postinterface>;
  currentUser: userinterface;
}) {
  const todisplay = data.map((element) => (
    <SinglePost currentUser={currentUser} key={element._id} {...element} />
  ));
  return (
    <>
      <div className=" flex flex-col gap-2">{todisplay}</div>
    </>
  );
}
