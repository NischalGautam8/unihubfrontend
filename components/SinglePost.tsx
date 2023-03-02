import React from "react";
import uplike from "../public/uplike.png";
import downlike from "../public/downlike.png";
import comment from "../public/comment.png";
import share from "../public/share.png";
import pp from "../public/pp.jpg";
import post from "../public/post.jpg";
import "../styles/Home.module.css";
import Image from "next/image";
import { Icon } from "@iconify/react";

function SinglePost({
  description,
  username,
  firstName,
  userId,
  lastName,
  postimage,
}) {
  return (
    <div className="" style={{ width: "700px" }}>
      <div
        style={{ backgroundColor: "#000000" }}
        className="post__wrapper   flex rounded-lg gap-3 pl-2 pr-2 pb-2 pt-2 "
      >
        {/* <div className="likes__section flex flex-col gap-3 ">
          <Image
            style={{ width: "32px" }}
            width={32}
            alt="upvote"
            src={uplike}
          ></Image>
          <Image
            //   style={{ width: "32px" }}
            width={32}
            alt="downvote"
            src={downlike}
          ></Image>
        </div> */}
        <div
          style={{ objectFit: "cover" }}
          className="profile__pic__content flex gap-2"
        >
          <div className="">
            <Image
              style={{
                borderRadius: "999px",
                objectFit: "cover",
                width: "50px",
                height: "50px",
              }}
              className="rounded-full max-w-fit"
              alt="profilepic"
              src={pp}
            ></Image>
          </div>
          <div className="content__section flex flex-col gap-3 ">
            <div className="profilename flex flex-col gap-1  ">
              <h1 className="font-semibold text-xl ">
                {firstName} {lastName}
              </h1>
              <p
                className="font-ubuntu "
                style={{ fontSize: "18px", fontWeight: "200" }}
              >
                {description}
              </p>
              {postimage && (
                <div className="py-2 max-w-fit  ">
                  <Image className="rounded" src={post} alt="postimage"></Image>
                </div>
              )}
            </div>
            <div className="comment__details flex gap-4">
              <div className="comment flex items-center gap-2">
                <Image
                  src={comment}
                  alt="comment"
                  width={20}
                  height={20}
                ></Image>
                <h1
                  className=" text-sm font-ubuntu "
                  style={{ color: "#8B8B8B" }}
                >
                  Comments 24k
                </h1>
              </div>
              <div className="comment flex items-center gap-2">
                <Image
                  src={comment}
                  alt="comment"
                  width={20}
                  height={20}
                ></Image>
                <h1
                  className=" text-sm font-ubuntu"
                  style={{ color: "#8B8B8B" }}
                >
                  Save
                </h1>
              </div>
              <div className="comment flex items-center gap-2">
                <Image src={share} alt="comment" width={20} height={20}></Image>
                <h1
                  className=" text-sm font-ubuntu"
                  style={{ color: "#8B8B8B" }}
                >
                  Share
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
