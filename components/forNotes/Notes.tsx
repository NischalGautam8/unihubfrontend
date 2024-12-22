import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { noteinterface } from "@/interfaces/noteinterface";
import SingleNoteCard from "./SingleNoteCard";
import Loading from "../Loading";
import { getNotesClientSide } from "@/apicalls/apicalls";
import { findNotes } from "@/apicalls/apicalls";
import { getUserNotes } from "@/apicalls/apicalls";
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
      onSuccess: () => setLoading(false),
      onError: () => setLoading(false),
      getNextPageParam: (_, pages) => pages.length + 1,
      enabled: !forSearch && !forUser,
      initialData: { pages: [initialdata], pageParams: [1] },
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
      onSuccess: () => setLoading(false),
      onError: () => setLoading(false),
      getNextPageParam: (_, pages) => pages.length + 1,
      enabled: forSearch,
      initialData: { pages: [initialdata], pageParams: [1] },
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
      onSuccess: () => setLoading(false),
      onError: () => setLoading(false),
      getNextPageParam: (_, pages) => pages.length + 1,
      enabled: forUser,
      initialData: { pages: [initialdata], pageParams: [1] },
    }
  );

  const dataToMap = forUser
    ? NotesUserData
    : forSearch
    ? NotesSearchData
    : RegularNotesData;

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <Loading />
        </div>
      )}
      <div className="pb-2">
        {dataToMap?.pages?.map((page: Array<noteinterface>, i) => (
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-3"
            key={i}
          >
            {page.map((note) => (
              <SingleNoteCard key={note._id} {...note} />
            ))}
          </div>
        ))}
      </div>
      {dataToMap?.pages?.[dataToMap.pages.length - 1]?.length === 10 && (
        <div className="flex justify-center items-center">
          <button
            disabled={
              isFetchingNextPageRegular ||
              isFetchingSearch ||
              isFetchingUserNote
            }
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
