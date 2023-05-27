import React, { useState } from "react";
import { Toast, toast } from "react-hot-toast";
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";
import Loading from "../Loading";
import cookie from "js-cookie";
import Router from "next/router";
function CreateNote() {
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File>();
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(file?.type);
  console.log("hello");
  console.log(input);
  const handleNoteUpload = async () => {
    try {
      if (!cookie.get("refresh_token")) {
        Router.push("/login");
        toast.error("You must be logged in to upload notes");
      }
      if (!file) {
        toast.error("Please Select a file");
        return;
      }
      if (input.length == 0) {
        toast.error("Please insert the Note title!");
        return;
      }
      if (subject.length == 0) {
        toast.error("Please enter subject");
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("name", input);
      formData.append("file", file || "");
      formData.append("subject", subject);
      formData.append("uploadedBy", "646714b941412e0da077f69d");
      const response = await axios.post(
        "http://localhost:5000/api/notes",
        formData
      );
      if (response.status == 200) {
        setLoading(false);
        setFile(undefined);
        setInput("");
        toast.success(
          "Sucessfully uploaded your note. Thanks for contributing❤️"
        );
      }
    } catch (err) {
      setLoading(false);
      toast.error("unable to upload file");
      console.log(err);
    }
  };
  return (
    <div className="flex w-[700px]  md:w-1/2 mb-5  ">
      <div className="relative flex gap-2    w-full ">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Title for  your note"
          className="bg-gray-900 inline  border-0  py-3 px-2 rounded-xl w-3/5"
        />
        <input
          onChange={(e) => setSubject(e.target.value)}
          type="text"
          placeholder="Enter the subject"
          className="bg-gray-900  border-0  py-3 px-2 rounded-xl w-2/5 inline"
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
            value=""
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const allowedFormats = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "application/pdf",
              ];

              if (
                e?.target.files &&
                allowedFormats.includes(e.target.files[0].type)
              ) {
                setFile(e.target.files[0]);
              } else {
                // File format not allowed
                toast.error("The selected file format is not allowed");
              }
            }}
            type="file"
          />
        </div>
        {/** TODO take username from redux */}
        <button
          onClick={handleNoteUpload}
          disabled={loading}
          className="px-3 top-1  absolute right-1   rounded-lg py-2 bg-slate-800 hover:bg-slate-500  ease-in delay-75"
        >
          <div className="flex  gap-4 items-center  ">
            <h1 className="text-lg">Post</h1>
            {loading && <div>{<Loading size={20} />}</div>}
          </div>
        </button>
      </div>
    </div>
  );
}

export default CreateNote;
