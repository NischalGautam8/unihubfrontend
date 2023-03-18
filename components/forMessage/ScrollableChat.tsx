import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import messageinterface from "@/interfaces/messageinterface";
import SingleMessage from "./SingleMessage";
//maps over message arrray given to it based on every message is sent by user or not
function ScrollableChat({ messages }: { messages: Array<messageinterface> }) {
  return (
    <ScrollableFeed className="flex flex-col gap-5">
      {messages.map((element: messageinterface) => (
        <SingleMessage message={element} key={element._id} />
      ))}
    </ScrollableFeed>
  );
}

export default ScrollableChat;
