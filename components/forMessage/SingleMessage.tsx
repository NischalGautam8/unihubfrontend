import React from "react";
import messageinteface from "../../interfaces/messageinterface";
import { determineMarginAndBackground } from "@/chatconfig/determineMargin";
import cookie from "js-cookie";
function SingleMessage({ message }: { message: messageinteface }) {
  const config = determineMarginAndBackground(message);
  // console.log(config);
  const user = JSON.parse(cookie.get("user"));
  return (
    //a empty new message was initialized at first
    message.content && (
      <div
        style={{
          marginLeft: config.marginLeft,
          backgroundColor:
            message.sender == user.userid ? "#5858ce" : "#1a2313",
        }}
        className="px-3 py-2 rounded-xl max-w-fit min-w-max"
      >
        <h1 className="">{message.content}</h1>
      </div>
    )
  );
}

export default SingleMessage;
