import React from "react";
import axios from "axios";
import { useState } from "react";
import { userinterface } from "@/interfaces/userinterface";
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

  return (
    <div className="min-h-screen">
      <CreateNote />

      <Notes forSearch={false} />
    </div>
  );
}

export default Index;
