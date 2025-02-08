import React from "react";
import SinglePost from "./SinglePost";
import { postinterface } from "@/interfaces/postinterface";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import cookie from "js-cookie";
import {
  fetchPosts,
  fetchUserPosts,
  findPosts,
  getSavedPosts,
} from "@/apicalls/apicalls";
import Loading from "./Loading";
import { useRouter } from "next/router";
import { noteinterface } from "@/interfaces/noteinterface";
import SavedPosts from "./SavedPosts";
import SinglePostSkeleton from "./SinglePostSkeleton";

export default function Posts({
  forSearch,
  forSaved,
  forUser,
  userid,
  refresh_token,
  searchQuery,
}: {
  forSearch: boolean;
  searchQuery?: string;
  forUser: boolean;
  forSaved: boolean;
  userid?: string; //for savedpost
  refresh_token?: string; //for saved post
}) {
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const router = useRouter();
  console.log("id", router.query.id);
  const [searchQueryState, setSearchQueryState] = useState(searchQuery);
  // var user = JSON.parse(stringuser);
  console.log(router.query.user);
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

  const {
    data: SearchPosts,
    fetchNextPage: fetchNextPageSearch,
    isFetchingNextPage: isFetchingNextPageSearch,
    isFetching,
  } = useInfiniteQuery(
    ["searchposts"],
    async ({ pageParam = 1 }) => {
      const response = await findPosts(searchQueryState);
      return response.data.posts;
    },
    {
      onSuccess: () => {
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      enabled: forSearch,
      initialData: {
        pages: [initialdata],
        pageParams: [1],
      },
    }
  );
  const {
    data: UserPosts,
    fetchNextPage: fetchNextPageUser,
    isFetchingNextPage: isFetchingNextPageUser,
  } = useInfiniteQuery(
    ["userposts"],
    async ({ pageParam = 1 }) => {
      ////todo remove this hardcoded value ant try to take user infor from the router.query.id
      const response = await fetchUserPosts(
        userid,
        pageParam,
        userid
      );
      return response.data.msg;
    },
    {
      onSuccess: () => {
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      enabled: forUser,
      initialData: {
        pages: [initialdata],
        pageParams: [1],
      },
    }
  );
  const {
    data: SavedPosts,
    fetchNextPage: fetchNextPageSaved,
    isFetchingNextPage: isFetchingNextPageSaved,
  } = useInfiniteQuery(
    ["savedposts"],
    async ({ pageParam = 1 }) => {
      const response = await getSavedPosts(userid, pageParam, refresh_token);
      return response.data.msg;
    },
    {
      onSuccess: () => {
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      enabled: forSaved,
      initialData: {
        pages: [initialdata],
        pageParams: [1],
      },
    }
  );
  const {
    data: RegularPosts,
    fetchNextPage: fetchNextPageRegular,
    isFetchingNextPage: isFetchingNextPageRegular,
  } = useInfiniteQuery(
    ["regularposts"],
    async ({ pageParam = 1 }) => {
      const response = await fetchPosts(userid, pageParam);
      return response.msg;
    },

    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      onSuccess: () => {
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
      enabled: !forSearch && !forSaved && !forUser,
      initialData: {
        pages: [initialdata],
        pageParams: [1],
      },
    }
  );
  console.log(loading);
  ///////////////add user posts
  // if (!data) return <></>;
  if (loading) {
    return (
     
<div className="space-y-6">
      {[...Array(5)].map((_, index) => (
        <SinglePostSkeleton key={index} />
      ))}
    </div>    );
  }
  let tomap;

  if (forSaved) {
    tomap = SavedPosts;
  } else if (forUser) {
    tomap = UserPosts;
  } else if (forSearch) {
    tomap = SearchPosts;
  } else if (!forSaved && !forSearch && !forUser) {
    tomap = RegularPosts;
  }
  console.log("tomap", tomap?.pages);
  return (
    <div className="w-1/2 pb-2">
      <div className="  flex flex-col gap-2">
        {tomap?.pages.map((page: Array<postinterface>, i) => (
          <div key={i}>
            {page.map((element) => (
              <SinglePost key={element._id} {...element} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        
        {RegularPosts?.pages[RegularPosts.pages.length - 1].length == 20 && (
          <button
            disabled={isFetchingNextPageRegular}
            className="px-3 py-2 rounded bg-white text-black mt-2 mb-5  "
            onClick={() => fetchNextPageRegular()}
          >
            {isFetchingNextPageRegular ? "Loading.." : "Load more"}
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
