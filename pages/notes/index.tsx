import React from "react";
import SingleNoteCard from "../../components/forNotes/SingleNoteCard";

import axios from "axios";
import { useState, useEffect } from "react";
import { Skeleton } from "@chakra-ui/react";
import { userinterface } from "@/interfaces/userinterface";
import { getNotesClientSide } from "@/apicalls/apicalls";
import Loading from "@/components/Loading";
import CreatePost from "@/components/CreatePost";
import CreateNote from "@/components/forNotes/CreateNote";
import Notes from "@/components/forNotes/Notes";
interface notes {
  _id: string;
  name: string;
  url: string;
  subject: string;
  uploadedBy: userinterface;
  ratings?: Number;
}
function Index({
  data,
}: {
  data: [notes];
  refresh_token: String;
  acess_token: String;
}) {
  const [page, setPage] = useState(1);
  const [subject, setSubject] = useState<string>("");
  const [notes, setNotes] = useState();
  const [loading, setLoading] = useState(false);
  const getNotesUtility = async () => {
    // const res = await axios.get(
    //   `https://unihubbackend.onrender.com/api/notes?page=${page}&&subject=${subject}`
    // );
    // console.log(res);
    const data = await getNotesClientSide(page, subject);
    setNotes(data);
    console.log(data);
    console.log;
    setLoading(false);
  };
  useEffect(() => {
    getNotesUtility();
  }, []);
  console.log(data);
  if (!notes)
    return (
      <div className="min-h-screen">
        <Loading />
      </div>
    );
  return (
    <div className="min-h-screen">
      <CreateNote />
      {/* <div className="min-h-screen">
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
      </div> */}
      <Notes forSearch={false} />
    </div>
  );
}
// export async function getServerSideProps(context: Context) {
//   try {
//     const res = await axios.get(`https://unihubbackend.onrender.com/api/notes`);
//     console.log(res.data);
//     let refresh_token = "";
//     let acess_token = "";
//     if (context.req.cookies.refresh_token && context.req.cookies.acess_token) {
//       refresh_token: context.req.cookies.refresh_token;
//       acess_token: context.req.cookies.access_token;
//     }
//     console.log(
//       "refresh",
//       context.req.cookies.refresh_token,
//       "ac",
//       context.req.cookies.acess_token
//     );
//     return {
//       props: {
//         data: res.data.notes,
//         refresh_token,
//         acess_token,
//       },
//     };
//   } catch (err) {
//     console.log(err);
//   }
// }

export default Index;
