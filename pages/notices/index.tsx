import React from "react";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import SingleNotice from "@/components/SingleNotice";
import axios from "axios";
interface notice {
  date: string;
  title: string;
  link: string;
}
interface props {
  data: notice[];
}
function index({ data }: { data: Array<notice> }) {
  console.log(data);
  return (
    <div className="min-h-screen px-5 flex flex-col gap-5">
      {data.map((element) => (
        <SingleNotice
          date={element.date}
          title={element.title}
          link={element.link}
          key={element.link}
        />
      ))}
    </div>
  );
}
export const getServerSideProps: GetServerSideProps<
  props,
  ParsedUrlQuery
> = async () => {
  try {
    const res = await axios.get(
      "https://real-cyan-chicken-veil.cyclic.app/notices"
    );
    console.log(res.data.notices.length);
    return {
      props: {
        data: res.data.notices,
      },
    };
  } catch (e) {
    console.log(e);
  }
};

export default index;
