/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import useProfile from "@/components/Profile/useProfile";
import { userinterface } from "@/interfaces/userinterface";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { postinterface } from "@/interfaces/postinterface";
import pp from "../../public/pp.jpg";
import Posts from "../../components/Posts";
import getTimeAgo from "../../utilityFunctions/dateTime";
import cookie from "js-cookie";
import ProfileDialog from "@/components/Profile/profileDialog";
import UserPosts from "@/components/userPosts";
import Notes from "@/components/forNotes/Notes";
import UserNotes from "@/components/forNotes/UserNotes";
import SavedPosts from "@/components/SavedPosts";
import { AccountCircle } from "@mui/icons-material";
export interface responseData extends userinterface {
  followerCount: Number;
  followingCount: Number;
  doYouFollow: boolean;
}
function profile() {
  const { follow, unfollow } = useProfile();
  const router = useRouter();
  let tabs = ["Posts", "Notes", "Saved"];
  const { id } = router.query;
  console.log(id);
  // if (JSON.parse(cookie.get("user") || "").userid == id) {
  //   tabs = ["Tweets", "Saved", "Notes"];
  // }
  let myid = "";
  var user = {};
  let refresh_token;
  if (cookie.get("user") && cookie.get("refresh_token")) {
    myid = JSON.parse(cookie.get("user") as string).userid;
    user = JSON.parse(cookie.get("user") || "");
    refresh_token = cookie.get("refresh_token");
  }
  console.log(myid);
  const [userData, setUserData] = useState<responseData>();
  const [userPosts, setUserPosts] = useState<Array<postinterface>>();
  console.log(userData, "userData");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [followerOrFollowing, setFollowerOrFollowing] = useState("");
  const [doYouFollow, setDoYouFollow] = useState<Boolean>();
  const [activeTab, setActiveTab] = useState("Posts");
  const { getUserInfo, getUserPosts } = useProfile();
  const getInfoUtility = async () => {
    try {
      const response = await getUserInfo(id as string, myid);
      console.log("user data",response);
      if (!response) throw new Error("cannot fetch");
      setUserData(response.data.user);
      setDoYouFollow(response.data.user.doYouFollow);
    } catch (err) {
      console.log(err);
    }
  };
  // const getPostsUtility = async () => {
  //   try {
  //     const response = await getUserPosts(id as string);
  //     console.log(response);
  //     if (!response) throw new Error("cannot fetch");
  //     setUserPosts(response.data.msg);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const followUtility = async (id: string, userid: string) => {
    const res = await follow(id, userid);
    // res?.status == 200
  };
  const unfollowUtility = async (id: string, userid: string) => {
    try {
      const res = await unfollow(id, userid);
      console.log(res);
      // res?.status == 200 && toast.success("followed");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getInfoUtility();
    // getPostsUtility();
  });
  return (
    <div className="min-h-screen  ">
      <div className=" flex mb-5   gap-2  items-center  ">
        <Link href={router.query.refby?.toString() || "/"}>
          <Icon width={42} icon="ion:arrow-back-outline" color="white" />
        </Link>
        <h1 className="text-3xl font-bold font-ubuntu">Profile</h1>
      </div>
      <div className="container mt-12 ">
        {userData ? (
          <div className="top">
            <div className="pp border border-black">
              {/* <Image
                style={{
                  borderRadius: "999px",
                  objectFit: "cover",
                  width: "110px",
                  height: "110px",
                }}
                className="rounded-full max-w-fit"
                src={pp}
                alt={"profilePic"}
              /> */}
              <AccountCircle className="w-16 h-16"/>
            </div>
            <div className="textContent pl-2 ">
              <div className="flex gap-5">
                <h1 className="font-bold text-2xl  tracking-wider ">
                  {userData?.firstName} {userData?.lastName}
                </h1>
                {router.query.id != myid && !doYouFollow && (
                  <button
                    className="text-white rounded bg-indigo-700 font-inter px-2 py-1 "
                    onClick={async () => {
                      followUtility(id as string, myid);
                      setDoYouFollow(true);
                    }}
                  >
                    Follow
                  </button>
                )}
                {router.query.id != myid && doYouFollow && (
                  <button
                    className="text-white rounded font-inter px-2 py-1 border-2 cursor-pointer"
                    onClick={async () => {
                      unfollowUtility(id as string, myid);
                      setDoYouFollow(false);
                    }}
                  >
                    Unfollow
                  </button>
                )}
              </div>
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
          <div className="space-x-3 flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gray-800 animate-pulse" />

          <div className="w-12 h-5 animate-pulse bg-gray-800"/>
          </div>
        )}
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
        {/* {console.log("refresh_token", refresh_token, "myid", myid)} */}
        {activeTab == "Notes" && <Notes forSearch={false} forUser={true} />}
        {activeTab == "Posts" && (
          <Posts
            forSearch={false}
            forUser={true}
            forSaved={false}
            userid={id as string}
          />
        )}
        {activeTab == "Saved" && refresh_token && myid && (
          <SavedPosts refresh_token={refresh_token} userid={myid} />
        )}
      </div>
    </div>
  );
}

export default profile;
