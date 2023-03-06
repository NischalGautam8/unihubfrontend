import React, { useState } from "react";
import SingleComment from "./SingleComment";
import Image from "next/image";
import pp from "../public/pp.jpg";
import axios from "axios";
import { Router, useRouter } from "next/router";
interface comment {
  _id: string;
  user: string;
  content: string;
  postid: string;
  createdAt: string;
  updatedAt: string;
  likes: Array<string>;
}
function Comment({ data }: { data: Array<comment> }) {
  const router = useRouter();
  console.log(router.query.id);
  console.log(data);
  const [commentsdata, setcommentsdata] = useState(data);
  const [err, seterr] = useState("");
  console.log("commentdatatype", commentsdata);
  const mappeed = commentsdata.map((element) => (
    <SingleComment key={element._id} {...element} />
  ));
  const [comment, setcomment] = useState("");
  const makecomment = async () => {
    try {
      const comm = await axios.post("http://localhost:5000/api/comment", {
        content: comment,
        userid: "64030116af5f071d1cefc0a2",
        postid: router.query.id,
      });

      setcomment("");
      const newdata = {
        content: comment,
        userid: "64030116af5f071d1cefc0a2",
        postid: router.query.id,
      };
      console.log(comm);
      comm.status == 200 && setcommentsdata([...commentsdata, newdata]);
    } catch (err) {
      console.log(err);
      seterr(err);
    }
  };
  console.log(comment);
  return (
    <div>
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
          className=" py-1 w-full pl-4 mt-7 mb-5"
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
            onClick={makecomment}
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
