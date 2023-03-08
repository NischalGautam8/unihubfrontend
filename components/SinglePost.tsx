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
import axios from "axios";

function SinglePost({
  _id,
  description,
  username,
  firstName,
  userId,
  lastName,
  postimage,
  comments, //make it just comment number
  likes,
}: postinterface) {
  const router = useRouter();
  const [liked, setLiked] = useState<Boolean>(
    likes.includes("64030116af5f071d1cefc0a1")
  ); //look from prop
  const [likedCount, setLikedCount] = useState<number>(likes.length);
  const [commentCount, setCommentCount] = useState<number>(comments.length);
  console.log("comment count", comments);
  ///check if the user has liked it or not previously ,do it while fetching the data in the backend check for the user requesting data lies in each of the posts liked array if liked then set liked state as true default & vice versa
  //or you can check it infront end with
  console.log(_id);
  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/like/${_id}`,
        {
          userid: "64030116af5f071d1cefc0a1",
        }
      );
      console.log(response);
      response.status == 200 && setLiked(true);
      response.status == 200 && setLikedCount((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnlike = async () => {
    const response = await axios.post(
      `http://localhost:5000/api/posts/unlike/${_id}`,
      {
        userid: "64030116af5f071d1cefc0a1",
      }
    );
    console.log(response);
    response.status == 200 && setLiked(false);
    response.status == 200 && setLikedCount((prev) => prev - 1);
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
                {firstName} {lastName}
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
                  {console.log(likedCount)}
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
