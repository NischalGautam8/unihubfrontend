import React from "react";
import conversations from "../interfaces/conversationinterface";
import { useRouter } from "next/router";
import { useState } from "react";

function MessageSection() {
  const [loading, setLoading] = useState(true);
  const [messagesData, setMessagesData] = useState([]);
  const router = useRouter();
  console.log(router.query.id);
  const fetchMessages = async () => {};
  return (
    <div>
      <div className="message__wrapper">
        <div className="nav__section py-5 flex justify-between"></div>
      </div>
    </div>
  );
}

export default MessageSection;
