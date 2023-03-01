import React from "react";
import Navbar from "../components/Navbar";
import { Icon } from "@iconify/react";
import Sidebar from "@/components/Sidebar";

function index() {
  return (
    <div
      style={{ backgroundColor: "#000000" }}
      className="whole__wrapper h-screen "
    >
      <Navbar />
      <div className="lower flex">
        <Sidebar />
      </div>
    </div>
  );
}

export default index;
