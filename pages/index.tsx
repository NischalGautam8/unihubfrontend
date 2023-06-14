import React, { useEffect } from "react";
import Posts from "@/components/Posts";
import CreatePost from "@/components/CreatePost";
import { useDispatch } from "react-redux";
import { login } from "@/features/user";
import { useState } from "react";
import { fetchPosts } from "@/apicalls/apicalls";
import cookie from "js-cookie";
function Index() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    const currentUser = JSON.parse(cookie.get("user") || "");
    dispatch(
      login({
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        acess_token: cookie.get("acess_token"),
        refresh_token: cookie.get("refresh_token"),
        userid: currentUser.userid,
      })
    );
    fetchPostsUtility(currentUser.userid || "", page);
  }, [page]);

  const [postsData, setPostsData] = useState();
  console.log(postsData);
  const fetchPostsUtility = async (userid: string, page: Number) => {
    const res = await fetchPosts(userid, page);
    setPostsData(res.msg);
  };
  return (
    <div className="min-h-screen ">
      <CreatePost />

      {postsData && <Posts usecase="home" />}
    </div>
  );
}
export default Index;
