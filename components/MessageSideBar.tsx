import React from "react";
import SingleConversation from "./SingleConversation";
import { conversations } from "../interfaces/conversation";
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
    <div className=" msg_sidebar pt-4 flex flex-col min-h-screen max-h-screen px-4 ">
      <h1 className="text-xl font-bold mb-5 pr-2">Conversations</h1>
      <div className=" ">{tomap}</div>
    </div>
  );
}

export default MessageSideBar;
