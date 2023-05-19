import { useRouter } from "next/router";
import Comment from "@/components/Comment";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { getSingleNote } from "@/apicalls/apicalls";
import Skeleton from "@mui/material/Skeleton";
import { userinterface } from "@/interfaces/userinterface";
import Link from "next/link";
import { Rating } from "@mui/material";
import cookie from "js-cookie";
import RightHandBar from "@/components/forNotes/RightHandBar";
import AlertDialogSlide from "@/components/forNotes/RatingDialog";
import { Context } from "vm";

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

function id({
  data,
  user,
  rating,
  noOfRating,
  prevRated,
}: {
  data: res;
  user: userinterface;
  rating: number;
  noOfRating: number;
  prevRated: number;
}) {
  const router = useRouter();
  console.log("rating", rating);
  const [noteData, setNoteData] = useState<res>(data);
  const [ratingModelVisible, setRatingModelVisible] = useState(false);
  const [ImageLoaded, setImageLoaded] = useState(true);
  const [noofrating, setNoofRating] = useState(noOfRating);
  const [ratingValue, setRatingValue] = useState(rating);
  console.log(ratingValue, "ratingvalue");
  return (
    <div className="page  flex  flex-col md:flex-row">
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
                precision={0.5}
                onChange={(event, newValue) => {
                  // setRatingMode(true);
                  setRatingValue(newValue || 0);
                  setRatingModelVisible(true);
                }}
              />
              {ratingModelVisible && (
                <AlertDialogSlide
                  ratingModelVisible={ratingModelVisible}
                  setRatingModelVisible={setRatingModelVisible}
                  ratingValue={ratingValue}
                  userid={JSON.parse(cookie.get("user") || "").userid}
                />
              )}
              <h1>({noofrating}) ratings</h1>
            </div>
            {prevRated != 0 && (
              <h1 className="text-sm ">Previously rated:{prevRated}</h1>
            )}
          </div>
        </div>
        <div className="w-full">
          <Comment
            compontenttype="notes"
            refid={router.query.id}
            userinfo={user}
          />
        </div>
      </div>
      <div className="w-1/3">
        <RightHandBar chosenSubject={noteData.subject} />
      </div>
    </div>
  );
}
export async function getServerSideProps(context: Context) {
  try {
    const user = JSON.parse(context.req.cookies.user || "kldf");
    const data = await getSingleNote(context.query.id, user.userid);
    return {
      props: {
        data: data.note,
        user,
        rating: data.rating,
        noOfRating: data.noOfRating,
        prevRated: data.prevRated,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default id;
