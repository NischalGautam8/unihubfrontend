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
   description: string; userId: {firstName:string;lastName:string;username:string;_id:string};hasLiked?:boolean|false;image?:string;commentsCount?:number;likesCount:number
}

function Id({
  data,
  comm,
  user,
  refresh_token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("data", data);
  const route = useRouter();
  console.log(refresh_token);
  const [postdata, setpostdata] = useState(data);
  const [commentdata, setcommentdata] = useState(comm);
  //router.push(/posts/id?route.pathname)
  console.log("singlepostdata",data);
  return (
    <div className="  min-h-screen ">
      <div className="  flex gap-2  items-center">
        <Link href={route.query.refby?.toString() || "/"}>
          <Icon width={42} icon="ion:arrow-back-outline" color="white" />
        </Link>
        <h1 className="text-3xl font-bold font-ubuntu">Post</h1>
      </div>
      <div className="mainn flex flex-col ">
        <SinglePost  {...data} />
        <div className="comments">
          <Comment
            refresh_token={refresh_token}
            compontenttype={"comment"}
            refid={route.query.id as string}
            //@ts-expect-error
            userinfo={user}
          />
        </div>
      </div>
    </div>
  );
}
//@ts-expect-error
export const getServerSideProps: GetServerSideProps<{
  data: Data;
  comm: comment;
  user: userinterface;
  refresh_token: string;
}> = async (context) => {
  try {
    const user = JSON.parse(context.req.cookies.user || "");
    console.log("user", user);
    const id = context.query.id;
    const refresh_token = context.req.cookies.refresh_token;
    const res = await axios.get(
      process.env.BASE_URL + `posts/${id}?userid=${user.userid}`
    );
    let data = res.data;

    return {
      props: {
        data,
        user,
        refresh_token,
      },
    };
  } catch (err) {}
};
export default Id;
