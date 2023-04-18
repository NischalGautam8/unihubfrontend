import React, { useState, useEffect } from "react";
import SingleComment from "./SingleComment";
import Image from "next/image";
import pp from "../public/pp.jpg";
import axios from "axios";
import Loading from "./Loading";
import { Router, useRouter } from "next/router";
import { commentinterface } from "@/interfaces/commentinterface";
import { makeComment, getComment } from "@/apicalls/apicalls";
import { userinterface } from "@/interfaces/userinterface";
interface comment {
  _id: string;
  user: string;
  content: string;
  postid: string;
  createdAt: string;
  updatedAt: string;
  likes: Array<string>;
}
function Comment({
  compontenttype,
  refid,
  userinfo,
}: {
  compontenttype: string;
  refid: string;
  userinfo: userinterface;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [commentsdata, setcommentsdata] = useState([]);
  const [err, seterr] = useState("");
  console.log("commentdatatype", commentsdata);
  const mappeed = commentsdata.map((element: commentinterface) => (
    <SingleComment key={element._id} {...element} />
  ));
  const getCommentUtility = async () => {
    const comments = await getComment(compontenttype, refid);
    setcommentsdata(comments.data.msg);
    setLoading(false);
  };
  useEffect(() => {
    getCommentUtility();
  }, []);
  const [comment, setcomment] = useState("");
  const makeCommentUtility = async () => {
    try {
      const comm = await makeComment(compontenttype, refid, userinfo);
      console.log(comm);
      setcomment("");
      const newdata = {
        content: comment,
        user: userinfo.userid,
        postid: router.query.id, //look here
        likes: [],
        replies: [],
      };
      comm.status == 200 && setcommentsdata([newdata, ...commentsdata]);
    } catch (err: any) {
      console.log(err);
      seterr(err);
    }
  };
  console.log(comment);
  return (
    <div>
      {loading && <Loading />}
      {err && (
        <div className="text-2xl mx-auto flex max-w-fit items-end gap-2  ">
          <h1>Unable to add comment</h1>
          <h1 className="text-xl underline" onClick={() => seterr("")}>
            Ok
          </h1>
        </div>
      )}
      <div className="flex items-center">
        <Image
          className="rounded-full max-w-fit"
          style={{
            borderRadius: "999px",
            objectFit: "cover",
            width: "40px",
            height: "40px",
          }}
          src={pp}
          alt="profile"
        />
        <input
          value={comment}
          onChange={(e) => setcomment(e.target.value)}
          className="comment py-1 w-full pl-4 mt-7 mb-5"
          type="text"
          placeholder="Add a comment..."
        />
      </div>
      {comment != "" && (
        <div className="flex ml-auto gap-5 font-ubuntu max-w-fit mb-3">
          <button
            onClick={() => setcomment("")}
            className="  flex justify-center items-center  px-3 py-1 rounded-3xl "
            style={{ backgroundColor: "#115e59" }}
          >
            Cancel
          </button>
          <button
            onClick={makeCommentUtility}
            style={{ backgroundColor: "#4f46e5      " }}
            className="  flex justify-center items-center  px-3 py-1 rounded-3xl "
          >
            Comment
          </button>
        </div>
      )}
      <div className="comments__wrapper flex flex-col gap-2">{mappeed}</div>
    </div>
  );
}
export default Comment;
