import React, { useEffect, useState } from "react";
import axios from "axios";

import SinglePost from "./SinglePost";
interface prop {
  data: string;
}

export default function Posts(props: prop) {
  //   const [state, setState] = useState([]);
  console.log("response" + props.data);
  console.log("fuck");
  //   const getdata = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5000/api/posts");
  //       setState(res.data);
  //       //   console.log(res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   useEffect(() => {
  //     getdata();
  //   }, []);
  return (
    <div>
      <div className="posts__wrapper">gg</div>
    </div>
  );
}
export async function getServerSideProps(context) {
  console.log("no");
  return {
    props: {}, // will be passed to the page component as props
  };
}
