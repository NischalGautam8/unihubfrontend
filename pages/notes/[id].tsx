import { useRouter } from "next/router";
import Comment from "@/components/Comment";
import React, { useEffect } from "react";
import { useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { getSingleNote } from "@/apicalls/apicalls";
import Skeleton from "@mui/material/Skeleton";
import { userinterface } from "@/interfaces/userinterface";
import Link from "next/link";
import { Rating } from "@mui/material";
interface res {
  _id: string;
  name: string;
  url: string;
  uploadedBy: userinterface;
  size: number;
  totalrating: number;
  numberofratings: number;
  subject: string;
  __v: number;
}

function id({ data, user }: { data: res; user: userinterface }) {
  const router = useRouter();
  const [noteData, setNoteData] = useState<res>(data);
  const [ImageLoaded, setImageLoaded] = useState(true);
  const [totalratings, setTotalRatings] = useState(40);
  const [noofrating, setNoofRating] = useState(10);
  const [ratingValue, setRatingValue] = useState(totalratings / noofrating);
  console.log(noteData);
  return (
    <div className="page">
      <div className="notesSection  flex  flex-col items-center w-2/3 gap-3">
        <div className="img shadow-white ">
          {ImageLoaded == false ? (
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: "grey.900" }}
              width={250}
              height={350}
            />
          ) : (
            <Image
              width={250}
              height={133.33}
              // onLoadingComplete={() => setImageLoaded(true)}
              className="rounded-lg    max-w-full object-cover h-full  ease-in"
              src={data.url.split(".").slice(0, 3).join(".") + ".jpg"}
              alt={"alt"}
            />
          )}
        </div>
        <Link href="/">
          <div className="mybtn px-4 py-3 rounded text-xl min-w-max ">
            Download{" "}
            <span className="inline text-sm">
              {noteData.size.toString().slice(0, 4)}MB
            </span>
          </div>
        </Link>
        <div className="text flex flex-col gap-2 ">
          <h1 className="text-center text-2xl font-bold font-ubuntu">
            {noteData.name.length > 25
              ? noteData.name?.slice(0, 25)
              : noteData.name}
          </h1>
          <div className=" gap-5 text-xl border-y py-5">
            <h1>
              Uploader :{" "}
              <p className="underline inline">{noteData.uploadedBy.username}</p>
            </h1>
            {/* <h1>
              Ratings:
              {noteData.totalrating
                ? noteData.totalrating / noteData.numberofratings
                : 0}{" "}
              /5{" "}
            </h1> */}
            <div className="flex gap-5">
              <Rating
                name="simple-controlled"
                value={ratingValue}
                onChange={(event, newValue) => {
                  setRatingValue(newValue);
                }}
              />
              <h1>({noofrating}) ratings</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3">
        <Comment
          compontenttype="notes"
          refid={router.query.id}
          userinfo={user}
        />
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps<res> = async (context) => {
  try {
    console.log(context);
    const data = await getSingleNote(context.query.id);
    // console.log(context)
    const user = JSON.parse(context.req.cookies.user);
    return {
      props: {
        data: data.note,
        user,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default id;
