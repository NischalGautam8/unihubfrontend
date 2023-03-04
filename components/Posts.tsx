import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SinglePost from "./SinglePost";

export default function Posts({ data }) {
  const todisplay = data.map((element) => (
    <SinglePost key={element._id} {...element} />
  ));
  return (
    <>
      <div className=" flex flex-col gap-2">{todisplay}</div>
    </>
  );
}
