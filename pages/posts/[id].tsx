import React from "react";
import { useRouter } from "next/router";
import Posts from "@/components/Posts";
import SinglePost from "@/components/SinglePost";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import Comment from "@/components/Comment";

import axios from "axios";
interface comment {
  user: string;
  content: string;
  postid: string;
  createdAt: string;
  updatedAt: string;
  likes: Array<string>;
}
interface Data {
  _id: string;
  description: String;
  firstName: String;
  lastName: String;
  userId: String;
  comments: Array<String>;
  likes: Array<String>;
}

function id({
  data,
  comm,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const route = useRouter();
  console.log(data);
  return (
    <div className=" boddy h-screen ">
      <div className=" fixx flex gap-2 items-center  ">
        <Link href="">
          <Icon width={42} icon="ion:arrow-back-outline" color="white" />
        </Link>

        <h1 className="text-3xl font-bold font-ubuntu">Post</h1>
      </div>
      <div className="mainn flex flex-col ">
        <SinglePost key={data._id} {...data} />
        <div className="comments">
          {console.log("comments array", comm)}
          <Comment data={comm} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: Data;
  comm: comment;
}> = async (context) => {
  const id = context.query.id;
  const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
  let data = res.data;
  var comm = await fetch(`http://localhost:5000/api/comment/${id}`);
  comm = await comm.json();
  console.log(comm);
  //   console.log(res);
  return {
    props: {
      data,
      comm,
    },
  };
};
export default id;
