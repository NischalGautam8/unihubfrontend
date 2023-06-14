import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserNotes } from "@/apicalls/apicalls";
import Loading from "../Loading";
import { useRouter } from "next/router";
import { noteinterface } from "@/interfaces/noteinterface";
import SingleNoteCard from "./SingleNoteCard";
function UserNotes() {
  const router = useRouter();
  const initialdata: Array<noteinterface> = [];
  const {
    data: NotesData,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["query1"],
    async ({ pageParam = 1 }) => {
      const response = await getUserNotes(router.query.id as string, pageParam);
      return response.data.notes;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [],
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
            <SingleNoteCard key={element._id} {...element} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default UserNotes;
