import React from "react";
import SingleConversation from "./SingleConversation";
import conversations from "../interfaces/conversation";

function MessageSideBar({
  conversations,
}: {
  conversations: Array<conversations>;
}) {
  console.log(conversations);
  const tomap = conversations.map((element: conversations) => (
    <SingleConversation data={element} key={element._id} />
  ));
  return (
    <div
      style={{ backgroundColor: "#210404" }}
      className="flex flex-col gap-5 min-h-screen"
    >
      {tomap}
    </div>
  );
}

export default MessageSideBar;
