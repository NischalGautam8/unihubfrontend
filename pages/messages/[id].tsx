import React from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MessageSideBar from "@/components/MessageSideBar";
import MessageSection from "@/components/MessageSection";
import cookie from "js-cookie";
import { GetServerSideProps } from "next";
import axios from "axios";
const socket = io.connect("http://localhost:5000");
function Group({ data }: { data: Array<any> }) {
  const router = useRouter();
  const [messages, setMessageReceived] = useState({});
  console.log("received", messages);
  const [messagetosend, setmessagetosend] = useState("");
  const roomtojoin = router.query.id;
  const joinRoom = () => {
    try {
      if (roomtojoin) {
        console.log("room joined");
        socket.emit("join_room", roomtojoin);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const functionTopass = (data: string) => {
    setmessagetosend(data);
  };
  const userx = cookie.get("user") && JSON.parse(cookie.get("user"));
  console.log(userx);
  const sendMessage = () => {
    socket.emit("send_message", {
      message: messagetosend,
      room: roomtojoin,
      sender: userx.userid,
      receiver: router.query.id,
    });
  };

  useEffect(() => {
    socket.on(
      "receive_message",
      (data: {
        _id: string;
        message: string;
        sender: string;
        receiver: string;
        room: string;
      }) => {
        console.log("messege_received", data);
        setMessageReceived({
          _id: data.message,
          content: data.message,
          sender: data.sender,
          receiver: data.receiver,
          conversation: data.room,
        });
      }
    );
  });
  console.log("new messagge ", messages);
  return (
    <div className="flex min-h-screen w-full">
      {console.log("message received")}
      <div className="flex w-full">
        <MessageSideBar conversations={data} />
        <MessageSection
          updateParent={functionTopass}
          sendMessage={sendMessage}
          newMessage={messages}
        />
      </div>
      <button onClick={() => sendMessage()}>send</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  //   console.log(context.req.headers.cookie);
  const { cookie } = context.req.headers;
  //   console.log(cookie);
  const response = await axios.get(
    "http://localhost:5000/api/conversation?userid=64030116af5f071d1cefc0a2"
  );
  console.log(response.data);
  return {
    props: { data: response.data },
  };
};
export default Group;
