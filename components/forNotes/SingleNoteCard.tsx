import React from "react";
import image from "../../../../Pictures/Screenshots/Screenshot (2).png";
import Image from "next/image";
import Link from "next/link";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
interface props {
  _id: string;
  url: string;
  uploadedBy: string;
  ratings?: Number;
  name: string;
  subject: string;
}
function singleNoteCard({
  _id,
  url,
  uploadedBy,
  ratings,
  name,
  subject,
}: props) {
  console.log("single Note");
  return (
    <>
      <Link href={"/notes/" + _id}>
        <div
          style={{ backgroundColor: "#2D2D2D" }}
          className="singleNoteCard max-w-fit cursor-pointer rounded-md"
        >
          <div className="flex flex-col w-full h-full ">
            <div className="image h-2/3 ">
              <Image
                width={250}
                height={133.33}
                className="rounded-t-lg    max-w-full object-cover h-full"
                src={url.split(".").slice(0, 3).join(".") + ".jpg"}
                alt={name || "alt"}
              />
              <div
                style={{ color: "black" }}
                className="hoverCard hidden hover:block"
              >
                Hi
              </div>
            </div>
            <div className="textSection h-1/3 px-1 py-1 flex flex-col justify-center ">
              <h1 style={{ color: "#E9CECE" }} className="font-ubuntu text-lg ">
                {name.length > 25 ? name?.slice(0, 25) : name}
              </h1>
              <p style={{ color: "#E9CECE" }} className="text-sm font-bold">
                {subject?.length > 20 ? subject?.slice(0, 20) + ".." : subject}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default singleNoteCard;
