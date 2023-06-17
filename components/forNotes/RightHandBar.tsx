import React, { useEffect, useState } from "react";
import { getNotesClientSide } from "@/apicalls/apicalls";
import loading from "../Loading";
import SingleNoteCard from "./SingleNoteCard";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { noteinterface } from "@/interfaces/noteinterface";
import dateTime from "../../utilityFunctions/dateTime";
import { useRouter } from "next/router";
function RightHandBar({ chosenSubject }: { chosenSubject: string }) {
  const router = useRouter();
  const [notesData, setNotesData] = React.useState([]);

  const [subject, setSubject] = useState(chosenSubject);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const getNotesUtility = async () => {
    const data = await getNotesClientSide(page, subject);
    console.log(data);
    setNotesData(data);
    setLoading(false);
  };
  const mapped = notesData.map((element: noteinterface) => {
    if (element._id != router.query.id)
      return (
        <div key={element._id}>
          <div className="flex gap-2 ">
            <Link href={`/notes/${element._id}`}>
              <Image
                width={80}
                height={30}
                className="rounded-t-lg  rounded-lg  max-w-full object-cover h-full"
                src={element.url.split(".").slice(0, 3).join(".") + ".jpg"}
                alt={element?.name || "alt"}
              />
            </Link>
            <div className="textSection flex flex-col gap-1 mt-1">
              <h1 className="  text-xl">{element.name.slice(0, 20)}</h1>
              <Link href={"/profile/" + element.uploadedBy._id}>
                <p className=" textSection username text-md">
                  {element.uploadedBy.username}
                </p>
              </Link>
              <div className="flex">
                <p className=" textSection text-md">
                  {dateTime(element.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
  });
  useEffect(() => {
    getNotesUtility();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject]);
  console.log(loading);
  console.log(notesData);
  return (
    <div className="w-full right__hand__bar">
      {loading ? (
        <div className="pl-10">
          <div className="tags flex gap-5 pb-5">
            {[1, 2, 3, 4].map((element) => (
              <Skeleton
                className="rounded-md"
                key={element}
                width="14%"
                height={28}
                animation="wave"
                sx={{ bgcolor: "grey.900" }}
                variant="rectangular"
              />
            ))}
          </div>
          <div className=" ">
            {[1, 2, 3, 4].map((element) => (
              <div className="flex gap-3 pb-3  " key={element}>
                <div>
                  <Skeleton
                    className="rounded-lg"
                    animation="wave"
                    sx={{ bgcolor: "grey.900" }}
                    variant="rectangular"
                    width={80}
                    height={115}
                  />
                </div>
                <div className="w-full">
                  <Skeleton
                    width="60%"
                    animation="wave"
                    sx={{ bgcolor: "grey.900" }}
                  />
                  <Skeleton
                    width="40%"
                    animation="wave"
                    sx={{ bgcolor: "grey.900" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">{mapped}</div>
      )}
    </div>
  );
}

export default RightHandBar;
