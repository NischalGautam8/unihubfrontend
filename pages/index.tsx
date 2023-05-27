import React, { useEffect } from "react";
import Posts from "@/components/Posts";
import { postinterface } from "@/interfaces/postinterface";
import CreatePost from "@/components/CreatePost";
import { Context } from "vm";
import { userinterface } from "@/interfaces/userinterface";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/features/user";
interface props {
  msg: Array<postinterface>;
}
function index({
  data,
  currentUser,
  refresh_token,
  acess_token,
}: {
  data: props;
  currentUser: userinterface;
  refresh_token: string;
  acess_token: string;
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      login({
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        acess_token,
        refresh_token,
        userid: currentUser.userid,
      })
    );
  }, [1]);

  const user = useSelector((state) => state.user.value);
  console.log(user, "usr  ");
  const tomap = data.msg;
  // console.log(currentUser, "user");
  return (
    <div className="min-h-screen">
      <CreatePost />
      <Posts data={tomap} />
    </div>
  );
}
export async function getServerSideProps(context: Context) {
  try {
    console.log("hello");
    let currentUser = {
      userid: "",
    };
    if (context.req.cookies.user) {
      currentUser = JSON.parse(context.req.cookies.user);
    }
    const res = await fetch(
      "http://localhost:5000/api/posts?userid=" + `${currentUser.userid}`
    );
    const data = await res.json();
    const refresh_token = "";
    const acess_token = "";
    if (context.req.cookies.refresh_token && context.req.cookies.acess_token) {
      refresh_token: context.req.cookies.refresh_token;
      acess_token: context.req.cookies.access_token;
    }
    console.log(context.req.cookies.refresh_token);
    return {
      props: {
        data,
        currentUser,
        refresh_token,
        acess_token,
      }, // will be passed to the page component as props
    };
  } catch (err) {
    console.log(err);
  }
}
export default index;
