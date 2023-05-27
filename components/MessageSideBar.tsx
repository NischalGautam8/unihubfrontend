import React from "react";
import SingleConversation from "./SingleConversation";
import { Icon } from "@iconify/react";
import { conversations } from "../interfaces/conversation";
import ScrollDialog from "./forMessage/scrollDialog";
import { useState } from "react";
function MessageSideBar({
  conversations,
}: {
  conversations: Array<conversations>;
}) {
  const [createConvo, setCreateConvo] = useState<Boolean>(false);
  console.log(conversations);
  const tomap = conversations?.map((element: conversations) => (
    <SingleConversation data={element} key={element._id} />
  ));
  return (
    <div className=" msg_sidebar pt-4 flex flex-col min-h-screen max-h-screen px-4 ">
      <div className="flex items-center mb-5">
        <h1 className="text-xl font-bold pr-2">Conversations</h1>
        <div className="add_conversation">
          <Icon
            onClick={() => setCreateConvo((prev) => !prev)}
            width={30}
            icon="material-symbols:add-circle-outline"
            color="white"
          />
        </div>
      </div>
      {createConvo && (
        <ScrollDialog
          createConvo={createConvo}
          setCreateConvo={setCreateConvo}
        />
      )}
      <div>{tomap}</div>
    </div>
  );
}

export default MessageSideBar;
//TODO:DONE
//how to create a popup window that overlaps current window
//get follwing of current user display only those whose following contains current user
//authenticate it in createConvo only allow to create convo beetween users who follow eacchother
