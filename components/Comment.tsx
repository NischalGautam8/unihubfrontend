import React from "react";
import SinglePost from "./SinglePost";
interface comment {
  user: string;
  content: string;
  postid: string;
  createdAt: string;
  updatedAt: string;
  likes: Array<string>;
}

function Comment({ data }: { data: Array<comment> }) {
  console.log(data.msg);
  const mappeed = data.msg.map((element) => <SinglePost {...element} />);
  return (
    <div>
      <div className="comments__wrapper">{mappeed}</div>
    </div>
  );
}

export default Comment;
