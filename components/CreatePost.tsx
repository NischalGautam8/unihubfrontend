import React, { useState } from "react";
import { Toast, toast } from "react-hot-toast";
import { createPost } from "@/apicalls/apicalls";
import ImageIcon from "@mui/icons-material/Image";
import { Input } from "@mui/material";
import { useSelector } from "react-redux";
function CreatePost() {
  const [input, setInput] = useState("");
  const userid = useSelector((state: any) => state.user.value.userid);
  console.log("redux id", userid);
  console.log(userid);
  const handlePost = async () => {
    try {
      const response = await createPost(input, userid);
      setInput("");
      toast.success("Sucessfully posted");
    } catch (err) {
      toast.error("Failed to post");
      console.log(err);
    }
  };
  return (
    <div className="flex w-[700px]  md:w-1/2 mb-5  ">
      <div className="relative    w-full ">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Pour your thoughts..."
          className="bg-gray-900  border-0  py-3 px-2 rounded-xl w-full"
        />
        <div className="image-upload flex absolute right-24 top-6 items-center ">
          <ImageIcon className="absolute" />
          <input className="absolute opacity-0 " id="file-input" type="file" />
        </div>
        {/** TODO take username from redux */}
        <button
          onClick={handlePost}
          className="px-3 top-1  absolute right-1   rounded-lg py-2 bg-slate-800 hover:bg-slate-500  ease-in delay-75"
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
