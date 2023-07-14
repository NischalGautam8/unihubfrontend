import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  findNotes,
  getNotesClientSide,
  getUserNotes,
} from "@/apicalls/apicalls";
import Loading from "../Loading";
import { useRouter } from "next/router";
import { noteinterface } from "@/interfaces/noteinterface";
import SingleNoteCard from "./SingleNoteCard";
function Notes({
  forSearch,
  forUser,
  searchQuery,
}: {
  forSearch: boolean;
  searchQuery?: string;
  forUser?: boolean;
}) {
  const router = useRouter();
  const initialdata: Array<noteinterface> = [];
  const [loading, setLoading] = useState(true);
  ///usernotes for search regular notes
  const {
    data: RegularNotesData,
    fetchNextPage: fetchNextPageRegular,
    isFetchingNextPage: isFetchingNextPageRegular,
    hasNextPage: hasNextPageRegular,
  } = useInfiniteQuery(
    ["notespage"],
    async ({ pageParam = 1 }) => {
      const data = await getNotesClientSide(pageParam, "");
      return data;
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
      enabled: !forSearch && !forUser,
      initialData: {
        pages: [initialdata],
        pageParams: [1],
      },
    }
  );
  const {
    data: NotesSearchData,
    fetchNextPage: fetchNextSearch,
    isFetchingNextPage: isFetchingSearch,
  } = useInfiniteQuery(
    ["search"],
    async ({ pageParam = 1 }) => {
      const response = await findNotes(searchQuery);
      return response.data;
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
    data: NotesUserData,
    fetchNextPage: FetchNextUser,
    isFetchingNextPage: isFetchingUserNote,
  } = useInfiniteQuery(
    ["user"],
    async ({ pageParam = 1 }) => {
      const response = await getUserNotes(router.query.id as string, pageParam);
      return response.data.notes;
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
  console.log(RegularNotesData);
  if (loading) {
    return (
      <div className="w-1/2">
        <Loading />
      </div>
    );
  }
  let tomap;
  if (forUser) {
    tomap = NotesUserData;
  } else if (forSearch) {
    tomap = NotesSearchData;
  } else {
    tomap = RegularNotesData;
  }
  console.log(tomap);
  return (
    <div className=" pb-2">
      {tomap?.pages?.map((page: Array<noteinterface>, i) => (
        <div
          className=" grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-3"
          key={i}
        >
          {page.map((element) => (
            <SingleNoteCard key={element._id} {...element} />
          ))}
        </div>
      ))}

      {RegularNotesData?.pages[RegularNotesData.pages.length - 1].length ==
        10 && (
        <div className="flex justify-center items-center">
          <button
            disabled={isFetchingNextPageRegular}
            onClick={() => {
              if (forSearch) fetchNextSearch();
              else if (forUser) FetchNextUser();
              else fetchNextPageRegular();
            }}
            className="px-3 py-2 rounded bg-white text-black mt-2 mb-5"
          >
            {isFetchingNextPageRegular || isFetchingSearch || isFetchingUserNote
              ? "Loading..."
              : "Next Page"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Notes;
