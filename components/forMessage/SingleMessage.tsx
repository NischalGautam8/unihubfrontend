import React, { useState } from "react";
import messageinteface from "../../interfaces/messageinterface";
import { determineMarginAndBackground } from "@/chatconfig/determineMargin";
import cookie from "js-cookie";
import getTimeAgo from "@/utilityFunctions/dateTime";
function SingleMessage({ message }: { message: messageinteface }) {
  const [clicked, setClicked] = useState(false);
  const config = determineMarginAndBackground(message);
  // console.log(config);
  const user = JSON.parse(cookie.get("user") || "");
  console.log(message);
  if (!message.content) return <></>;
  return (
    //a empty new message was initialized at first
    <div
      style={{
        marginLeft: config.marginLeft,
      }}
    >
      <div
        style={
          clicked
            ? {
                marginLeft: config.marginLeft,
                backgroundColor:
                  message.sender == user.userid ? "    #7777e9" : "#3d4d32",
              }
            : {
                marginLeft: config.marginLeft,
                backgroundColor:
                  message.sender == user.userid ? "#5858ce" : "#1a2313",
              }j
        }
        className="px-3 py-2 rounded-xl delay-100 ease-in max-w-fit min-w-max"
      >
        <h1 onClick={() => setClicked((prev) => !prev)} className="">
          {message.content}
        </h1>
      </div>
      {clicked && (
        <p className="text-slate-500">
          {(message.sender == user.userid ? "sent " : "received ") +
            getTimeAgo(message.createdAt)}
        </p>
      )}
    </div>
  );
}

export default SingleMessage;
