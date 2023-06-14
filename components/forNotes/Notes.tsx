import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getNotesClientSide, getUserNotes } from "@/apicalls/apicalls";
import Loading from "../Loading";
import { useRouter } from "next/router";
import { noteinterface } from "@/interfaces/noteinterface";
import SingleNoteCard from "./SingleNoteCard";
function Notes() {
  const router = useRouter();
  const initialdata: Array<noteinterface> = [];
  const {
    data: NotesData,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["query"],
    async ({ pageParam = 1 }) => {
      const data = await getNotesClientSide(pageParam, "");
      return data;
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
  console.log(NotesData);
  if (!NotesData) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div>
      {NotesData.pages.map((page: Array<noteinterface>, i) => (
        <div key={i}>
          {page.map((element) => (
            //@ts-expect-error temp fix
            <SingleNoteCard key={element._id} {...element} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Notes;
