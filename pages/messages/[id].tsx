import React from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MessageSideBar from "@/components/MessageSideBar";
import MessageSection from "@/components/MessageSection";
import Router from "next/router";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";
import axios from "axios";
import messageinterface from "../../interfaces/messageinterface";
const token = Cookies.get("refresh_token");
// console.log("token", token);
const socket = io.connect("https://unihubbackend.onrender.com", {
  auth: {
    token: token,
    user: Cookies.get("user") && JSON.parse(Cookies.get("user") || "").userid,
  },
});
function Group({ data }: { data: Array<any> }) {
  const router = useRouter();
  const [messages, setMessageReceived] = useState<messageinterface>({});
  console.log("received", messages);
  const [messagetosend, setmessagetosend] = useState("");
  const roomtojoin = router.query.id;
  const joinRoom = () => {
    try {
      if (roomtojoin) {
        console.log("room joined");
        socket.emit("join_room", roomtojoin, Cookies.get("refresh_token"));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const userx = Cookies.get("user") && JSON.parse(Cookies.get("user") || "");
  const functionTopass = (data: string) => {
    setmessagetosend(data);
  };

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
    <div className="flex min-h-screen w-full ">
      <div className="flex w-full ">
        <MessageSideBar conversations={data} />
        <MessageSection
          updateParent={functionTopass}
          sendMessage={sendMessage}
          newMessage={messages}
          joinRoom={joinRoom}
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  const user = JSON.parse(context.req.cookies.user || "");
  const { Cookies } = context.req.headers;
  //   console.log(Cookies);
  const response = await axios.get(
    `https://unihubbackend.onrender.com/api/conversation?userid=${user.userid}`
  );
  console.log(response);
  return {
    props: { data: response.data },
  };
};
export default Group;
