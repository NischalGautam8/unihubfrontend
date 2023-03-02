import React from "react";
import Navbar from "../components/Navbar";
import { Icon } from "@iconify/react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Sidebar from "@/components/Sidebar";
import SinglePost from "../components/SinglePost";

import axios from "axios";
import Posts from "@/components/Posts";
import { Suspense } from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function LoadingSpinner() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return loading ? (
    <div
      style={{ backgroundColor: "#000000" }}
      className="loading-spinner-container "
    >
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  ) : (
    <></>
  );
}

function index({ data }) {
  const tomap = data.msg;
  const todisplay = tomap.map((element) => (
    <SinglePost key={element._id} {...element} />
  ));
  return (
    <>
      <div
        style={{ backgroundColor: "#000000" }}
        className="whole__wrapper pb-10"
      >
        <Navbar />
        <div className="lower flex sm:gap-2 lg:gap-36">
          <div className="wrapper__forflex  ">
            <div className="overflow-x-hidden fixed ">
              <Sidebar />
            </div>
          </div>
          <div className="posts flex ml-32 flex-col gap-2">{todisplay}</div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps() {
  console.log("hello");

  const res = await fetch("http://localhost:5000/api/posts");
  const data = await res.json();
  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}

export default index;
