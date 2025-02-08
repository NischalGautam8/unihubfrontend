import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Posts from "@/components/Posts";
import CreatePost from "@/components/CreatePost";
import { useDispatch } from "react-redux";
import { login } from "@/features/user";
import { fetchPosts } from "@/apicalls/apicalls";
import cookie from "js-cookie";

function Index() {
  const [page, setPage] = useState(1);
  const [postsData, setPostsData] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  // Handle user authentication and redirect if no user is found
  useEffect(() => {
    try {
      const userCookie = cookie.get("user");
      if (userCookie) {
        const parsedUser = JSON.parse(userCookie);
        setCurrentUser(parsedUser);

        // Dispatch login action
        dispatch(
          login({
            username: parsedUser.username,
            firstName: parsedUser.firstName,
            lastName: parsedUser.lastName,
            access_token: cookie.get("access_token"),
            refresh_token: cookie.get("refresh_token"),
            userid: parsedUser.userid,
          })
        );
      } else {
        // Redirect to login if no user details are found
        router.push("/login");
      }
    } catch (error) {
      console.error("Error parsing user cookie:", error);
      router.push("/login");
    }
  }, [dispatch, router]);

  // Fetch posts data
  //@ts-expect-error
  const fetchPostsUtility = async (userid, page) => {
    try {
      const res = await fetchPosts(userid, page);
      setPostsData(res.msg);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      //@ts-expect-error
      fetchPostsUtility(currentUser.userid, page);
    }
  }, [currentUser, page]);

  // Show loading screen or placeholder until redirection completes
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen ">
      <CreatePost />
      <Posts
      //@ts-expect-error
        userid={currentUser ? currentUser.userid : ""}
        forSearch={false}
        forUser={false}
        forSaved={false}
      />
    </div>
  );
}

export default Index;
