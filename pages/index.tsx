import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "@/components/Sidebar";
import Posts from "@/components/Posts";
interface postinterface extends Document {
  description: String;
  firstName: String;
  lastName: String;
  userId: String;
  comments: Array<String>;
  likes: Array<String>;
}

interface props {
  msg: Array<postinterface>;
}
function index({ data }: { data: props }) {
  const tomap = data.msg;

  return <Posts data={tomap} />;
}
export async function getServerSideProps() {
  console.log("hello");

  const res = await fetch("http://localhost:5000/api/posts");
  const data = await res.json();
  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}
export default index;
