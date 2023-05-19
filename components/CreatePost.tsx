import { Input } from "@chakra-ui/react";
import React from "react";

function CreatePost() {
  return (
    <div style={{ width: "700px" }} className="flex   md:w-1/2 mb-5  ">
      <div className="relative    w-full ">
        <input
          type="text"
          placeholder="Pour your thoughts..."
          className="bg-gray-900  border-0  py-3 px-2 rounded-xl w-full"
        />
        <button className="px-3 top-1  absolute right-1   rounded-lg py-2 bg-slate-800 hover:bg-slate-500  ease-in delay-75">
          Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
