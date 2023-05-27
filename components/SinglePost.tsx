import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import comment from "../public/comment.png";
import share from "../public/share.png";
import pp from "../public/pp.jpg";
import post from "../public/post.jpg";
import "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { postinterface } from "@/interfaces/postinterface";

import { handleLikeUtil, handleUnlikeUtil } from "@/apicalls/apicalls";
import { userinterface } from "@/interfaces/userinterface";
import { useSelector } from "react-redux";

function SinglePost({
  _id, //post id
  description,
  postimage,
  userId, //object that contains userinfo
  hasLiked,
  commentsCount,
  likesCount,
}: //make it just comment number,
postinterface) {
  const router = useRouter();
  const userid = useSelector((state: any) => state.user.value.userid);
  console.log("redux userid", userid);
  const [liked, setLiked] = useState<Boolean>(
    hasLiked
    //TODO: take user info from redux and use it insted of hardcoded value:  done
  ); //look from prop
  const [likedCount, setLikedCount] = useState<number>(likesCount);
  const [commentCount, setCommentCount] = useState<number>(commentsCount);

  const handleLike = async () => {
    try {
      const response = await handleLikeUtil(_id, userid);
      response?.status == 200 && setLiked(true);
      response?.status == 200 && setLikedCount((prev) => prev + 1);
    } catch (err) {}
  };
  const handleUnlike = async () => {
    const response = await handleUnlikeUtil(_id, userid);
    response?.status == 200 && setLiked(false);
    response?.status == 200 && setLikedCount((prev) => prev - 1);
  };
  return (
    <div
      onClick={(e) => {
        router.push(`/posts/${_id}`);
      }}
      className=""
      style={{ width: "700px" }}
    >
      <div
        style={{ backgroundColor: "#000000" }}
        className="post__wrapper    flex rounded-lg gap-3 pl-2 pr-2 pb-2 pt-2 "
      >
        <div
          style={{ objectFit: "cover" }}
          className="profile__pic__content flex gap-3"
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
              {postimage && (
                <div className="py-2 max-w-fit  ">
                  <Image className="rounded" src={post} alt="postimage"></Image>
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
                  src={comment}
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
                <Image src={share} alt="comment" width={18} height={18}></Image>
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
