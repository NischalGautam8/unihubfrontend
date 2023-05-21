import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Posts from "@/components/Posts";
import SinglePost from "@/components/SinglePost";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import Comment from "@/components/Comment";
import axios from "axios";
import cookie from "js-cookie";
import { userinterface } from "@/interfaces/userinterface";
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
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("data", data);
  const route = useRouter();
  const [postdata, setpostdata] = useState(data);
  const [commentdata, setcommentdata] = useState(comm);
  //router.push(/posts/id?route.pathname)
  return (
    <div className="  min-h-screen ">
      <div className=" fixed flex gap-2  items-center  ">
        <Link href={route.query.refby?.toString() || "/"}>
          <Icon width={42} icon="ion:arrow-back-outline" color="white" />
        </Link>
        <h1 className="text-3xl font-bold font-ubuntu">Post</h1>
      </div>
      <div className="mainn flex flex-col ">
        <SinglePost key={data._id} {...data} />
        <div className="comments">
          <Comment
            compontenttype={"comment"}
            refid={route.query.id}
            userinfo={user}
          />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: Data;
  comm: comment;
}> = async (context) => {
  try {
    const id = context.query.id;
    const res = await axios.get(process.env.BASE_URL + `posts/${id}`);
    let data = res.data;
    const user = JSON.parse(context.req.cookies.user || "");

    return {
      props: {
        data,
        user,
      },
    };
  } catch (err) {}
};
export default id;
