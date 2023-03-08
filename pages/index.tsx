import React from "react";
import Posts from "@/components/Posts";
import { postinterface } from "@/interfaces/postinterface";

interface props {
  msg: Array<postinterface>;
}
function index({ data }: { data: props }) {
  const tomap = data.msg;
  return (
    <div className="min-h-screen">
      <Posts data={tomap} />
    </div>
  );
}
export async function getServerSideProps() {
  try {
    console.log("hello");
    const res = await fetch("http://localhost:5000/api/posts");
    const data = await res.json();
    return {
      props: {
        data,
      }, // will be passed to the page component as props
    };
  } catch (err) {
    console.log(err);
  }
}
export default index;
