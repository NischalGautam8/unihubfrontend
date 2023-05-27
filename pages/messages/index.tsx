import React from "react";
import MessageSideBar from "@/components/MessageSideBar";
import axios from "axios";
import cookies from "js-cookie";
import Router, { useRouter } from "next/router";
import { GetServerSideProps } from "next";

function index({ data }: { data: Array<any> }) {
  return (
    <div>
      <MessageSideBar conversations={data} />
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
    `http://localhost:5000/api/conversation?userid=${user.userid}`
  );
  console.log(response);
  return {
    props: { data: response.data },
  };
};

export default index;
