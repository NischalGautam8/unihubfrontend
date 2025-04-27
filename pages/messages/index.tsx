import React from "react";
import MessageSideBar from "@/components/MessageSideBar";
import axios from "axios";
import cookies from "js-cookie";
import Router, { useRouter } from "next/router";
import { GetServerSideProps } from "next";

function index({ data }: { data: Array<any> }) {
  return (
    <div className="flex">
      <MessageSideBar conversations={data} />
      <div className=" w-2/3 font-bold text-xl select flex items-center justify-center">
        <h1 className="text-white">
          Please select a conversation to start messaging
        </h1>
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  var user = {
    userid: "",
  };
  if (context.req.cookies.user) {
    user = JSON.parse(context.req.cookies.user || "");
  }
  const { Cookies } = context.req.headers;
  //   console.log(Cookies);
  const response = await axios.get(
    `https://unihubbackend-production.up.railway.app/api/conversation?userid=${user.userid}`
  );
  console.log(response);
  return {
    props: { data: response.data },
  };
};

export default index;
