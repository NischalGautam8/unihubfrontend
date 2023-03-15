import React from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
const socket = io.connect("http://localhost:5000");
function Group() {
  const router = useRouter();
  const [messages, setMessageReceived] = useState("");
  const [messagetosend, setmessagetosend] = useState("");
  const [roomtojoin, setroomtojoin] = useState(router.query.id);

  const joinRoom = () => {
    try {
      if (roomtojoin) {
        socket.emit("join_room", roomtojoin);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const sendMessage = () => {
    socket.emit("send_message", {
      message: messagetosend,
      room: roomtojoin,
    });
  };
  useEffect(() => {
    socket.on("receive_message", (data: { message: string }) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="min-h-screen">
      <input type="text" onChange={(e) => setmessagetosend(e.target.value)} />
      <button>Send</button>
      <button onClick={() => joinRoom}>Join Room</button>
      <h1>{messages}</h1>
    </div>
  );
}

export default Group;
