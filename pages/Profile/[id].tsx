/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import useProfile from "@/components/Profile/useProfile";
import { userinterface } from "@/interfaces/userinterface";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { postinterface } from "@/interfaces/postinterface";
import pp from "../../public/pp.jpg";
import Loading from "@/components/Loading";
import Posts from "../../components/Posts";
import getTimeAgo from "../../utilityFunctions/dateTime";
import cookie from "js-cookie";
import ProfileDialog from "@/components/Profile/profileDialog";

interface responseData extends userinterface {
  followerCount: Number;
  followingCount: Number;
}
function profile() {
  const router = useRouter();
  let tabs = ["Posts", "Notes"];
  const { id } = router.query;
  // if (JSON.parse(cookie.get("user") || "").userid == id) {
  //   tabs = ["Tweets", "Saved", "Notes"];
  // }
  const [userData, setUserData] = useState<responseData>();
  const [userPosts, setUserPosts] = useState<Array<postinterface>>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [followerOrFollowing, setFollowerOrFollowing] = useState("");
  const [activeTab, setActiveTab] = useState("Posts");
  const { getUserInfo, getUserPosts } = useProfile();
  const getInfoUtility = async () => {
    try {
      const response = await getUserInfo(id as string);
      console.log(response);
      if (!response) throw new Error("cannot fetch");
      setUserData(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };
  const getPostsUtility = async () => {
    try {
      const response = await getUserPosts(id as string);
      console.log(response);
      if (!response) throw new Error("cannot fetch");
      setUserPosts(response.data.msg);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getInfoUtility();
    getPostsUtility();
  }, [id]);
  return (
    <div className="min-h-screen  ">
      <div className="container ">
        {userData ? (
          <div className="top">
            <div className="pp border border-black">
              <Image
                style={{
                  borderRadius: "999px",
                  objectFit: "cover",
                  width: "110px",
                  height: "110px",
                }}
                className="rounded-full max-w-fit"
                src={pp}
                alt={"profilePic"}
              />
            </div>
            <div className="textContent pl-2 ">
              <h1 className="font-bold text-2xl  tracking-wider ">
                {userData?.firstName} {userData?.lastName}
              </h1>
              <p className="color  text-slate-500 text-lg">
                {"@" + userData?.username}
              </p>
              <p className="color  text-slate-500 text-lg">
                {"Joined " +
                  getTimeAgo(new Date(userData?.createdAt).toString())}
              </p>
              <div className="flex gap-5">
                {dialogOpen && (
                  <ProfileDialog
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                    type={followerOrFollowing}
                  />
                )}
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    setFollowerOrFollowing("Followers");
                    setDialogOpen(true);
                  }}
                >
                  <span className="font-bold">
                    {userData.followerCount.toString()}
                  </span>{" "}
                  Followers
                </p>
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    setDialogOpen(true);
                    setFollowerOrFollowing("Following");
                  }}
                >
                  {" "}
                  <span className="font-bold">
                    {userData.followingCount.toString()}
                  </span>{" "}
                  Following
                </p>
              </div>
            </div>
          </div>
        ) : (
          <h1>Loading</h1>
        )}
        {console.log(activeTab)}
        <div className="tabs flex gap-5 mt-8 px-5 ">
          {tabs.map((tab) => {
            return (
              <div
                onClick={() => setActiveTab(tab)}
                style={
                  activeTab == tab
                    ? { borderBottom: "4px solid blue" }
                    : { border: "0px" }
                }
                key={tab}
                className="px-5 py-2 text-xl font-medium "
              >
                {tab}
              </div>
            );
          })}
        </div>
        {userPosts ? (
          activeTab == "Posts" && <Posts data={userPosts} />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default profile;
