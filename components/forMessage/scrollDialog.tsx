import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import {
  getFollowingModule,
  createConversation,
} from "../../apicalls/apicalls";
import pp from "../../public/pp.jpg";
import { useRouter } from "next/router";
import { userinterface } from "@/interfaces/userinterface";
export default function ScrollDialog({
  createConvo,
  setCreateConvo,
}: {
  createConvo: Boolean;
  setCreateConvo: any;
}) {
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [friends, setFriends] = React.useState<Array<userinterface>>([]);
  const [newConvoUsers, setNewConvouUsers] = React.useState<
    Array<userinterface>
  >([]);
  const hashmap = new Map();
  const [load, setLoad] = React.useState(true);
  const router = useRouter();
  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const handleCheckBoxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log(e.target.value);
    if (e.target.checked) {
      // setNewConvouUsers([...newConvoUsers, JSON.parse(e.target.value)]);
      console.log(index, "checked");
      console.log(JSON.parse(e.target.value));
      hashmap.set(index, JSON.parse(e.target.value));
    } else {
      hashmap.delete(index);
    }
    console.log(hashmap);
  };
  const handleClose = () => {
    setOpen(false);
    setCreateConvo(false);
  };
  console.log("new", newConvoUsers);

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createConvo]);
  const user = JSON.parse(Cookies.get("user") || "");
  const getFollowing = async () => {
    console.log(getFollowingModule(user.userid));
    const following = await getFollowingModule(user.userid);
    console.log(following);
    const friends = following.data.following.filter(
      (element: any) => element.isFriend
    );
    console.log(friends);
    setLoad(false);
    setFriends(friends);
  };
  const mapped = friends.map((element: userinterface, index: number) => (
    <div className="flex justify-between" key={element._id}>
      <div className="flex items-center gap-3">
        <Image
          style={{
            borderRadius: "999px",
            objectFit: "cover",
            width: "50px",
            height: "50px",
          }}
          src={pp}
          className="rounded-full max-w-fit"
          alt="profile"
        ></Image>
        <h1 className="text-lg font-bold text-black font-inter ">
          {element.firstName + " "}
          {element.lastName}
        </h1>
      </div>
      <input
        onChange={(e) => handleCheckBoxChange(e, index)}
        value={JSON.stringify(element)}
        type="checkbox"
        className="w-4"
      />
    </div>
  ));
  useEffect(() => {
    getFollowing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createConvo]);
  console.log(load);
  return (
    <div>
      <Dialog
        className=""
        style={{ color: "black" }}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <div>
          <DialogTitle className="font-bold" id="scroll-dialog-title">
            <h1 className="text-xl font-bold" style={{ color: "black" }}>
              Create a New Conversation
            </h1>
          </DialogTitle>
          <DialogContent
            className=" dialogue__content  "
            dividers={scroll === "paper"}
          >
            {load ? (
              <Box sx={{ width: 300 }}>
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
              </Box>
            ) : (
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                {mapped}
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button className="" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                try {
                  const res = await createConversation([
                    ...Array.from(hashmap.values()),
                    user.userid,
                  ]);
                  console.log(res.data._id);
                  res.status == 200 && router.push("/messages/", res.data._id);
                  console.log(res);
                  handleClose();
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Create
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
