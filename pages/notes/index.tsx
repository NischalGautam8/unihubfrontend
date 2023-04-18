import React from "react";
import SingleNoteCard from "../../components/forNotes/SingleNoteCard";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton, Box } from "@chakra-ui/react";
interface notes {
  _id: string;
  name: string;
  url: string;
  subject: string;
  uploadedBy: string;
  ratings?: Number;
}
function index() {
  const [page, setPage] = useState(1);
  const [subject, setSubject] = useState<string>("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const getNotes = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/notes?page=${page}&&&subject=${subject}`
    );
    console.log(res);
    setNotes(res.data.notes);
    setLoading(false);
  };
  useEffect(() => {
    getNotes();
  }, [page]);
  return (
    <div className="min-h-screen">
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
              <SingleNoteCard key={element._id} {...element} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default index;
