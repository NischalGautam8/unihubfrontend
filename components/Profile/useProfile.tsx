import { typography } from "@chakra-ui/react";
import { cat } from "@cloudinary/base/qualifiers/focusOn";
import axios from "axios";
import React from "react";

function useProfile() {
  const getUserInfo = async (userid: string, myid: string) => {
    try {
      console.log(userid, "userid");
      const res = await axios.get(
        `https://unihubbackend.onrender.com/api/user/${userid}?myid=${myid}`
      );
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  const getFollowers = async (userid: string, myid: string) => {
    try {
      const response = await axios.get(
        `https://unihubbackend.onrender.com/api/followers/${userid}?id=${myid}`
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };
  const follow = async (userid: string, myid: string) => {
    try {
      const respnse = await axios.post(
        `https://unihubbackend.onrender.com/api/follow/${userid}`,
        {
          id: myid,
        }
      );
      return respnse;
    } catch (err) {
      console.log(err);
    }
  };
  const unfollow = async (userid: string, myid: string) => {
    try {
      const respnse = await axios.post(
        `https://unihubbackend.onrender.com/api/unfollow/${userid}`,
        {
          id: myid,
        }
      );
      return respnse;
    } catch (err) {
      console.log(err);
    }
  };
  const getUserPosts = async (userid: string) => {
    try {
      const res = await axios.get(
        `https://unihubbackend.onrender.com/api/posts/user/${userid}`
      );
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return { getUserInfo, getUserPosts, getFollowers, follow, unfollow };
}

export default useProfile;
