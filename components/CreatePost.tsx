import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import ImageIcon from "@mui/icons-material/Image";
import { useSelector } from "react-redux";
import cookie from "js-cookie";
import { useRouter } from "next/router";
function CreatePost() {
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.user.value);
  console.log(user, "user");
  const router = useRouter();
  const handlePost = async () => {
    try {
      if (!cookie.get("refresh_token")) {
        router.push("/login");
        toast.error("You must be logged in to create a Post");
        return;
      }
      if (input == "") {
        toast.error("Please enter some text");
        return;
      }
      setLoading(true);
      const formdata = new FormData();
      formdata.append("description", input);
      formdata.append("userId", user.userid);
      formdata.append("jwt", user.refresh_token || "");
      if (file) {
        if (file.type == "image/jpg" || "image/png" || "image/jpeg") {
          formdata.append("file", file || "");
        } else {
          toast.error("Selected file is not an image");
        }
      }
      const response = await axios.post(
        "http://localhost:5000/api/posts",
        formdata
      );
      setInput("");
      response?.status == 200 && toast.success("Sucessfully posted");
      setLoading(false);
    } catch (err) {
      toast.error("Failed to post");
      console.log(err);
    }
  };
  return (
    <div className="flex w-[380px] md:w-[500px] lg:w-[600px]   mb-5  ">
      <div className="relative  w-full ">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Pour your thoughts..."
          style={{ backgroundColor: "rgb(32, 35, 39)" }}
          className="bg-gray-800 outline-none  border-0  py-3 px-2 rounded-xl w-full"
        />
        <div className="image-upload flex absolute right-24 top-6 items-center ">
          <div className="absolute flex">
            {file && !loading && (
              <h1
                style={{ color: "black" }}
                className="text-base absolute bottom-1 left-3 z-10 font-bold   "
              >
                ✔️
              </h1>
            )}
            <ImageIcon className="relative" />
          </div>
          <input
            className="absolute opacity-0 "
            id="file-input"
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />
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
