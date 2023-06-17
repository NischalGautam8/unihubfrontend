import { findPosts, findUsers } from "@/apicalls/apicalls";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useState } from "react";
import cookie from "js-cookie";
import Posts from "@/components/Posts";
import Notes from "@/components/forNotes/Notes";
import SearchUser from "@/components/ForSearch/SearchUser";
import Image from "next/image";
import search from "../../public/icons8-search-50.png";
import Button from "@mui/material/Button";

function Index() {
  const initialData: any = [];
  const router = useRouter();
  const [searchquery, setSearchQuery] = useState("");
  let userid = "";
  if (cookie.get("user")) {
    userid = JSON.parse(cookie.get("user") || "").userid;
  }
  const [active, setActive] = useState("");
  // const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
  //   ["query4"],
  //   async ({ pageParam = 1 }) => {
  //     if (active == "users") {
  //       const response = await findUsers(searchquery);
  //       return response.data.users;
  //     } else {
  //       const response = await findPosts(searchquery, userid);
  //       console.log("response", response);
  //       return response.posts;
  //     }
  //   },
  //   {
  //     getNextPageParam: (_, pages) => {
  //       return pages.length + 1;
  //     },
  //     initialData: {
  //       pages: [initialData],
  //       pageParams: [1],
  //     },
  //   }
  // );
  // console.log(data?.pages);
  const tabs = ["People", "Posts", "Notes"];
  return (
    <div className="min-h-screen">
      <div className="searchinfo">
        <div className="flex">
          <input
            style={{ backgroundColor: "rgb(32, 35, 39)" }}
            type="text"
            // onKeyDown={(event) => {
            //   if (event.key == "Enter") {
            //     searchquery.length > 0 &&
            //       router.push(`/search?searchquery=${searchquery}`);
            //   }
            // }}
            placeholder="Search "
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" px-1 text-gray-200 py-2 pl-10 rounded-lg outline-none  w-[300px] "
          />
          {/* <Image
            onClick={() => setActive("People")}
            src={search}
            width={36}
            height={37}
            alt="search"
            className=" hover:color-white cursor-pointer  "
          /> */}
        </div>
        <div className="tabs flex flex-row gap-3 rounded mt-5 mb-5 ">
          {tabs.map((tab) => (
            <button
              className="bg-hovercolor focus:bg-white focus:text-black rounded-lg focus:ring-offset-1  px-3 py-2"
              onClick={() => setActive(tab)}
              key={tab}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* <SearchPosts searchstring={(searchquery as string) || ""} /> */}
        {active == "Posts" && (
          <Posts
            forSearch={true}
            forUser={false}
            forSaved={false}
            searchQuery={searchquery}
          />
        )}
        {active == "Notes" && (
          <Notes forSearch={true} searchQuery={searchquery} forUser={false} />
        )}
        {active == "People" && <SearchUser searchQuery={searchquery} />}
      </div>
    </div>
  );
}

export default Index;
