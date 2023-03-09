import React from "react";
import { useState } from "react";
function form({ type }: { type: string }) {
  const [username, setusename] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  console.log(username);
  return (
    <div>
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => {
          setusename(e.target.value);
        }}
      />
    </div>
  );
}

export default form;
