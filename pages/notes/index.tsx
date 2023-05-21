import React from "react";
import SingleNoteCard from "../../components/forNotes/SingleNoteCard";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton, Box, typography } from "@chakra-ui/react";
import { userinterface } from "@/interfaces/userinterface";
import { getNotesClientSide } from "@/apicalls/apicalls";
import { Context } from "vm";
import CreatePost from "@/components/CreatePost";
import CreateNote from "@/components/forNotes/CreateNote";
interface notes {
  _id: string;
  name: string;
  url: string;
  subject: string;
  uploadedBy: userinterface;
  ratings?: Number;
}
function index({ data }: { data: [notes] }) {
  const [page, setPage] = useState(1);
  const [subject, setSubject] = useState<string>("");
  const [notes, setNotes] = useState(data);
  const [loading, setLoading] = useState(false);
  const getNotesUtility = async () => {
    // const res = await axios.get(
    //   `http://localhost:5000/api/notes?page=${page}&&subject=${subject}`
    // );
    // console.log(res);
    const data = await getNotesClientSide(page, subject);
    console.log(data);
    setNotes(data);
    setLoading(false);
  };
  return (
    <div className="min-h-screen">
      <CreateNote />
      {loading ? (
        <div className="h-screen">
          <Skeleton
            height="40px"
            startColor="pink.500"
            endColor="orange.500"
            animation="wave"
          />
          <Skeleton
            startColor="pink.500"
            endColor="orange.500"
            animation="wave"
          />
          <Skeleton
            startColor="pink.500"
            endColor="orange.500"
            animation="wave"
          />
        </div>
      ) : (
        <div className="min-h-screen">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-2">
            {notes.map((element: notes) => (
              <SingleNoteCard
                key={element._id}
                width={250}
                height={133.33}
                {...element}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export async function getStaticProps(context: Context) {
  try {
    const res = await axios.get(`http://localhost:5000/api/notes`);
    console.log(res.data);
    return {
      props: {
        data: res.data.notes,
      },
    };
  } catch (err) {
    console.log(err);
  }
}

export default index;
