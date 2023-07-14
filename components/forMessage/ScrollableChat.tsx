import React, { useEffect, useRef } from "react";
import ScrollableFeed from "react-scrollable-feed";
import messageinterface from "@/interfaces/messageinterface";
import SingleMessage from "./SingleMessage";
import InfiniteScroll from "react-infinite-scroll-component";
//maps over message arrray given to it based on every message is sent by user or not
function ScrollableChat({
  messages,
  page,
  setPage,
}: {
  messages: Array<messageinterface>;
  page: number;
  setPage: Function;
}) {
  const msgref = useRef(null);
  const scrollToBottom = () => {
    //@ts-expect-error
    msgref.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div
      ref={msgref}
      className="scrollable_chat  overflow-y-scroll scrollbar-hide gap-5 flex flex-col pb-5 pt-3 "
    >
      {messages.length >= 24 && (
        <button className="text-slate-300" onClick={() => setPage(page + 1)}>
          View more
        </button>
      )}
      {messages.map((element: messageinterface) => (
        <SingleMessage message={element} key={element._id} />
      ))}
      {page > 1 && (
        <button className="text-slate-300" onClick={() => setPage(page - 1)}>
          View Less
        </button>
      )}
    </div>
  );
}

export default ScrollableChat;
