import React from "react";
import Link from "next/link";

function SingleNotice({
  date,
  title,
  link,
}: {
  date: string;
  title: string;
  link: string;
}) {
  return (
    <>
      <Link target={"_blank"} href={link}>
        <div style={{ maxWidth: "600px" }} className="min-w-fit py-2 ">
          <h1 className="pb-1 text-lg">{title}</h1>
          <p>{date}</p>
        </div>
      </Link>
    </>
  );
}

export default SingleNotice;
