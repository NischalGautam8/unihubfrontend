import { findUsers } from "@/apicalls/apicalls";
import { userinterface } from "@/interfaces/userinterface";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import SingleUser from "./SingleUser";

const SearchUser = ({ searchQuery }: { searchQuery: string }) => {
  const initialData: Array<userinterface> = [];
  const {
    data: SearchUsers,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ["searchuser"],
    async ({ pageParam = 1 }) => {
      const response = await findUsers(searchQuery);
      return response.data.user;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
    }
  );
  console.log(SearchUsers?.pages);
  return (
    <div className="w-1/2 pb-2">
      <div className="  flex flex-col">
        {SearchUsers?.pages.map((page: Array<userinterface>, i) => (
          <div key={i} className="">
            {page.map((element) => (
              <SingleUser key={element._id} {...element} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        {SearchUsers?.pages.length == 10 && (
          <button
            disabled={isFetchingNextPage}
            className="px-3 py-2 rounded bg-white text-black mt-2 mb-5  "
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? "Loading.." : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
