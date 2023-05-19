import React from "react";
import Posts from "@/components/Posts";
import { postinterface } from "@/interfaces/postinterface";
import CreatePost from "@/components/CreatePost";
import { Context } from "vm";
import { userinterface } from "@/interfaces/userinterface";

interface props {
  msg: Array<postinterface>;
}
function index({
  data,
  currentUser,
}: {
  data: props;
  currentUser: userinterface;
}) {
  const tomap = data.msg;
  console.log(currentUser, "user");
  return (
    <div className="min-h-screen">
      <CreatePost />
      <Posts data={tomap} currentUser={currentUser} />
    </div>
  );
}
export async function getServerSideProps(context: Context) {
  try {
    console.log("hello");
    const res = await fetch("http://localhost:5000/api/posts");
    const data = await res.json();
    const currentUser = JSON.parse(context.req.cookies.user || "kldf");

    return {
      props: {
        data,
        currentUser,
      }, // will be passed to the page component as props
    };
  } catch (err) {
    console.log(err);
  }
}
export default index;
