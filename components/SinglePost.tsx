import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import comment from "../public/comment.png";
import save from "../public/saved.png";
import unsave from "../public/icons8-save-30.png";

import "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { postinterface } from "@/interfaces/postinterface";
import cookie from "js-cookie";
import { handleLikeUtil, handleUnlikeUtil } from "@/apicalls/apicalls";
import { userinterface } from "@/interfaces/userinterface";
interface props{
  _id: string;
   description: string; userId: {firstName:string;lastName:string;username:string;_id:string};hasLiked?:boolean;image?:string;commentsCount?:number;likesCount:number}
function SinglePost({
  _id, //post id
  description,
  image,
  userId,
  hasLiked,
  commentsCount,
  likesCount,
}: props ) {
  const router = useRouter();
  //@ts-expect-error obj
  const [user, setUser] = useState<userinterface>({});
  const [refresh_token, setrefresh_token] = useState("");
  useEffect(() => {
    let user = JSON.parse(cookie.get("user") || "");
    setUser(user);
    let refresh_token = cookie.get("refresh_token") || "";
    setrefresh_token(refresh_token);
  }, []);
  const [liked, setLiked] = useState<Boolean>(
    hasLiked ?hasLiked:false
    //TODO: take user info  from redux and use it insted of hardcoded value:  done
  ); //look from prop
  const [likedCount, setLikedCount] = useState<number>(Number(likesCount));
  const [commentCount, setCommentCount] = useState<number>(commentsCount || 0);
  const handleLike = async () => {
    try {
      const response = await handleLikeUtil(_id, user.userid, refresh_token);

      response?.status == 200 && setLiked(true);
      response?.status == 200 && setLikedCount((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnlike = async () => {
    try {
      const response = await handleUnlikeUtil(_id, user.userid, refresh_token);
      response?.status == 200 && setLiked(false);
      response?.status == 200 && setLikedCount((prev) => Number(prev) - 1);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      // onClick={(e) => {
      //   router.push(`/posts/${_id}`);
      // }}
      className="w-full max-w-2xl  mx-auto rounded-md overflow-hidden border-gray-800 "
      // style={{ width: "700px" }}
    >
      <div
        style={{ backgroundColor: "#000000" }}
        className="post__wrapper    flex rounded-lg gap-3 pl-2 pr-2 pb-2 pt-2 "
      >
        <div
          style={{ objectFit: "cover" }}
          className="profile__pic__content flex gap-3"
        >
          <div
            onClick={() =>
              router.replace(`/profile/${userId._id}?user=${userId._id}`)
            }
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
                width={50}
                height={50}
                src={
                  image ||
                  "https://res.cloudinary.com/ds8b7v9pf/image/upload/v1686138382/vtte6f71uucqydh78dhw.png"
                }
              ></Image>
            </div>
          </div>
          <div className="content__section flex flex-col gap-3 ">
            <div className="profilename flex flex-col gap-1  ">
              <h1 className="font-semibold text-xl ">
                {userId.firstName} {userId.lastName}
              </h1>
              <Link href={`/posts/${_id}`}>
                <p
                  className="font-ubuntu "
                  style={{ fontSize: "18px", fontWeight: "200" }}
                >
                  {description}
                </p>
              </Link>
              {image && (
                <div className="py-2 max-w-fit  ">
                  <Image
                    className="rounded"
                    src={image}
                    width={600}
                    height={700}
                    alt="postimage"
                  ></Image>
                </div>
              )}
            </div>
            <div className="comment__details flex gap-4">
              <div className="comment flex items-center gap-2">
                {liked ? (
                  <div>
                    <FavoriteIcon
                      onClick={(e) => {
                        handleUnlike();
                      }}
                    />
                  </div>
                ) : (
                  <div>
                    <FavoriteBorderIcon onClick={() => handleLike()} />
                  </div>
                )}
                <h1
                  className=" text-sm font-ubuntu "
                  style={{ color: "#8B8B8B" }}
                >
                  Like {likedCount}
                </h1>
              </div>
              <div className="comment flex items-center gap-2">
                <Image
                  src={comment}
                  alt="comment"
                  width={18}
                  height={18}
                ></Image>
                <h1
                  className=" text-sm font-ubuntu "
                  style={{ color: "#8B8B8B" }}
                >
                  Comments {commentCount}
                </h1>
              </div>
              <div className="comment flex items-center gap-2">
                <Image
                  src={unsave}
                  alt="comment"
                  width={18}
                  height={18}
                ></Image>
                <h1
                  className=" text-sm font-ubuntu"
                  style={{ color: "#8B8B8B" }}
                >
                  Save
                </h1>
              </div>
              <div className="comment flex items-center gap-2">
                {/* <Image src={share} alt="comment" width={18} height={18}></Image> */}
                <button
                  onClick={async () =>
                    await navigator.clipboard.writeText(
                      `http://localhost:3000/posts/${_id}`
                    )
                  }
                  style={{ color: "black" }}
                  className="copy"
                >
                  <span
                    data-text-end="Copied!"
                    data-text-initial="Copy to clipboard"
                    className="tooltip"
                  ></span>
                  <span>
                    <svg
                      style={{
                        background: "new 0 0 512 512",
                      }}
                      viewBox="0 0 6.35 6.35"
                      y="0"
                      x="0"
                      height="20"
                      width="20"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      className="clipboard"
                    >
                      <g>
                        <path
                          fill="currentColor"
                          d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"
                        ></path>
                      </g>
                    </svg>
                    <svg
                      style={{
                        background: "new 0 0 512 512",
                      }}
                      viewBox="0 0 24 24"
                      y="0"
                      x="0"
                      height="18"
                      width="18"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      className="checkmark"
                    >
                      <g>
                        <path
                          data-original="#000000"
                          fill="currentColor"
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </button>
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
