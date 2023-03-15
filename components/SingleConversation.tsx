import React from "react";
import Image from "next/image";
import image from "../public/art.jpg";
import conversations from "../interfaces/conversationinterface";
import Link from "next/link";

function SingleConversation({ data }: { data: conversations }) {
  return (
    <div>
      <Link href={`/messages/${data._id}`}>
        <div className=" singleconvo wrapper flex gap-5 px-5 py-2">
          <Image width={24} src={image} alt="profile" />
          <div className="content">
            <h1>{data.name}</h1>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SingleConversation;
