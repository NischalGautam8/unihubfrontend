import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import secret from "../public/icons8-secured-mail-50.png";

function Sidebar() {
  const [active, setActive] = React.useState("Home");
  return (
    <div className="sidebar__wrapper flex flex-col">
      <div className="icon__wrapper flex flex-col gap-6 ">
        <Link href="/">
          <div
            onClick={() => {
              setActive("Home");
            }}
            style={
              active == "Home"
                ? {
                    backgroundColor: "#3c3232",
                    borderRadius: "16px",
                  }
                : {}
            }
            className="icon flex  items-center justify-center gap-3 px-3 py-1  "
          >
            <Icon width={"34px"} icon="ic:baseline-home" />
            <h1 className="text-xl  font-poppins">Home</h1>
          </div>
        </Link>
        <Link href="https://www.confess.nischalgautam.com.np">
          <div
            onClick={() => {
              setActive("Confessions");
            }}
            style={
              active == "Confessions"
                ? {
                    backgroundColor: "#3c3232",
                    borderRadius: "16px",
                  }
                : {}
            }
            className="icon flex  items-center justify-center gap-3 px-3 py-1  "
          >
            <Image style={{ width: "34px" }} alt="secret" src={secret} />
            <h1 className="text-xl  font-poppins">Confessions</h1>
          </div>
        </Link>
        <Link href="/notes">
          <div
            onClick={() => {
              setActive("Notes");
            }}
            style={
              active == "Notes"
                ? {
                    backgroundColor: "#3c3232",
                    borderRadius: "16px",
                  }
                : {}
            }
            className="icon flex  items-center justify-center gap-3 px-3 py-1  "
          >
            <Icon width={"34px"} icon="ic:baseline-home" />
            <h1 className="text-xl  font-poppins">Notes</h1>
          </div>
        </Link>
        <Link href="/messages">
          <div
            onClick={() => {
              setActive("Groups");
            }}
            style={
              active == "Groups"
                ? {
                    backgroundColor: "#3c3232",
                    borderRadius: "16px",
                  }
                : {}
            }
            className="icon flex  items-center justify-center gap-3 px-3 py-1  "
          >
            <Icon width={"34px"} icon="material-symbols:clinical-notes" />
            <h1 className="text-xl  font-poppins">Message</h1>
          </div>
        </Link>
        <Link href="/notices">
          <div
            onClick={() => {
              setActive("Notices");
            }}
            style={
              active == "Notices"
                ? {
                    backgroundColor: "#3c3232",
                    borderRadius: "16px",
                  }
                : {}
            }
            className="icon flex  items-center justify-center gap-3 px-3 py-1  "
          >
            <Icon width={"34px"} icon="ic:baseline-home" />
            <h1 className="text-xl  font-poppins">Notices</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
