import React from "react";
import conversations from "../interfaces/conversation";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ScrollableChat from "./forMessage/ScrollableChat";
import { Icon } from "@iconify/react";
import messageinterface from "../interfaces/messageinterface";
import cookies from "js-cookie";

function MessageSection({
  updateParent,
  sendMessage,
  newMessage,
  joinRoom,
}: {
  updateParent: any;
  sendMessage: any;
  newMessage: messageinterface;
  joinRoom: any;
}) {
  const router = useRouter();
  const [load, setload] = useState(false);
  const [messagesData, setMessagesData] = useState<Array<messageinterface>>([]);
  const [newmsg, setNewMessage] = useState<messageinterface>(newMessage);
  console.log(router.query.id);
  const [conversationData, setConversationData] = useState<{
    name: string;
    id: string;
    updatedAt: string;
  }>({ name: "", id: "", updatedAt: "" });
  const [memberData, setMemberData] = useState([]);
  // console.log(router.pathname);
  const [page, setPage] = useState(1);
  const [inputMsg, setInputMsg] = useState("");
  const fetchMessages = async () => {
    try {
      const res: conversations = await axios.get(
        `http://localhost:5000/api/convoandmessage/${router.query.id}?page=${page}`,
        {
          headers: {
            authorization: `Bearer ${cookies.get("refresh_token")}`,
          },
        }
      );
      setConversationData({
        name: res.data.conversation.name,
        id: res.data.conversation._id,
        updatedAt: res.data.conversation.updatedAt,
      });
      console.log(res);
      setMessagesData([...res.data.conversation.messages, newMessage]);
      setMemberData(res.data.conversation.users);
      setload(false);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setNewMessage(newMessage);
    fetchMessages();
    joinRoom();
  }, [newMessage, router.query.id, page]);
  //update  on prop change
  console.log("new msge", newmsg);
  const userx = cookies.get("user") && JSON.parse(cookies.get("user") || "");
  // console.log(conversationData);
  return (
    <div className="w-3/5 sticky  ">
      {load ? (
        <Box className="flex  justify-center ">
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <div className="message__wrapper    ">
          <div className="nav__section py-3 px-5  flex justify-between mb-2 ">
            <h1
              className="font-bold text-2xl font-ubun
          "
            >
              {conversationData.name}
            </h1>
          </div>
          <div className="contentSection px-2">
            <ScrollableChat
              messages={messagesData}
              setPage={setPage}
              page={page}
            />
          </div>
          <div className="message__input w-full flex items-center gap-2 pt-2">
            <input
              value={inputMsg}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  sendMessage();
                  setMessagesData((prev) => [
                    ...prev,
                    {
                      content: inputMsg,
                      _id: inputMsg,
                      sender: userx.userid,
                      receiver: router.query.id,
                      conversation: router.query.id,
                    },
                  ]);
                  setInputMsg("");
                }
              }}
              onChange={(e) => {
                updateParent(e.target.value);
                setInputMsg(e.target.value);
              }}
              type="text "
              className="send_message py-3 px-4 rounded-3xl w-full"
            />
            <Icon
              onClick={() => {
                sendMessage();
                setMessagesData((prev) => [
                  ...prev,
                  {
                    content: inputMsg,
                    _id: inputMsg,
                    sender: userx.userid,
                    receiver: router.query.id,
                    conversation: router.query.id,
                  },
                ]);
                setInputMsg("");
              }}
              width="36px"
              icon="material-symbols:send-rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageSection;
