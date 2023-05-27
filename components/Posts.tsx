import React from "react";
import SinglePost from "./SinglePost";
import { postinterface } from "@/interfaces/postinterface";
export default function Posts({ data }: { data: Array<postinterface> }) {
  const todisplay = data.map((element) => (
    <SinglePost key={element._id} {...element} />
  ));
  return (
    <>
      <div className=" flex flex-col gap-2">{todisplay}</div>
    </>
  );
}
