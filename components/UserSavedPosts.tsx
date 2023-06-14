import React from "react";
import SinglePost from "./SinglePost";
import { postinterface } from "@/interfaces/postinterface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import cookie from "js-cookie";
import { fetchPosts, fetchUserPosts, getSavedPosts } from "@/apicalls/apicalls";
import Loading from "./Loading";
import { useRouter } from "next/router";
import { noteinterface } from "@/interfaces/noteinterface";
import { Context } from "vm";
export default function Posts() {
  const [postsData, setPostsData] = useState([]);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const stringuser = cookie.get("user");
  console.log(stringuser);
  // var user = JSON.parse(stringuser);

  const initialdata: Array<noteinterface> = [
    // {
    //   _id: "646b3ef07a5d8ac5c00a679b",
    //   description: "i really like this",
    //   userId: {
    //     _id: "646714b941412e0da077f69d",
    //     username: "nikkunikku",
    //     firstName: "nischal",
    //     lastName: "nischal",
    //   },
    //   createdAt: "2023-05-22T10:07:44.584Z",
    //   updatedAt: "2023-05-26T10:42:21.650Z",
    //   __v: 0,
    //   commentsCount: 1,
    //   likesCount: 1,
    //   hasLiked: false,
    // },
  ];

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["query"],
    async ({ pageParam = 1 }) => {
      const response = await getSavedPosts(
        "646714b941412e0da077f69d",
        pageParam
      );
      return response.data.msg;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [initialdata],
        pageParams: [1],
      },
    }
  );
  // if (!data) return <></>;
  // if (data?.pages[0].length == 0) {
  //   return (
  //     <div>
  //       <Loading />
  //     </div>
  //   );
  // }

  return (
    <div className="w-1/2 pb-2">
      <div className="  flex flex-col gap-2">
        {data?.pages.map((page: Array<postinterface>, i) => (
          <div key={i}>
            {page.map((element) => (
              <SinglePost key={element._id} {...element} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        {data?.pages[data.pages.length - 1].length == 20 && (
          <button
            disabled={isFetchingNextPage}
            className="px-3 py-2 rounded bg-white text-black mt-2 mb-5  "
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? "Loading.." : "Load more"}
          </button>
        )}
        {/* {data?.pages[data.pages.length - 1].length !== 20 && (
          <button className="px-3 py-2 rounded bg-white text-black mt-2 mb-5">
            {`You've seen it all`}
          </button>
        )} */}
      </div>
    </div>
  );
}
