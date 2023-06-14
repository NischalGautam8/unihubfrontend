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
import { getFollowingModule } from "../../apicalls/apicalls";
import pp from "../../public/pp.jpg";
import { useRouter } from "next/router";
import { userinterface } from "@/interfaces/userinterface";
import useProfile from "./useProfile";
import { responseData } from "@/pages/profile/[id]";
import { toast } from "react-hot-toast";
export default function ProfileDialog({
  dialogOpen,
  setDialogOpen,
  type,
}: {
  dialogOpen: boolean;
  setDialogOpen: Function; //functionn
  type: String; //Follower of Following
}) {
  const [open, setOpen] = React.useState(dialogOpen);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const { follow, unfollow } = useProfile();
  const [rerender, setRerender] = React.useState(false);
  const [friends, setFriends] = React.useState([]);
  const { getFollowers } = useProfile();
  const [load, setLoad] = React.useState(true);
  const router = useRouter();
  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    setDialogOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, []);
  const user = JSON.parse(Cookies.get("user") || "");
  const getFollowingUtility = async () => {
    console.log(getFollowingModule(router.query.id as string));
    const following = await getFollowingModule(router.query.id as string);
    console.log(friends);
    setFriends(following.data.following);
    setLoad(false);
  };
  const getFollowersUtility = async () => {
    try {
      const res = await getFollowers(router.query.id, user.userid);
      if (!res) throw new Error("cannot fetch followers");
      console.log("followrs", res);
      setFriends(res.data.followers);
      setLoad(false);
    } catch (err) {
      console.log(err);
    }
  };
  const followUtility = async (id: string, userid: string) => {
    const res = await follow(id, userid);
    res?.status == 200 && toast.success("followed");
  };
  const unfollowUtility = async (id: string, userid: string) => {
    try {
      const res = await unfollow(id, userid);
      console.log(res);
      res?.status == 200 && toast.success("unfollowed");
    } catch (err) {
      console.log(err);
    }
  };
  const mapped = friends.map((element: any, index: number) => {
    return (
      <div className="flex  " key={element._id}>
        <div className="flex items-center   gap-3">
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
          <div className="nameandbutton justify-between flex gap-7 items-center ">
            <h1 className="text-lg font-bold text-black font-inter ">
              {element.firstName + " "}
              {element.lastName}
            </h1>

            {user.userid != element._id && (
              <button
                onClick={async () => {
                  !element.doYouFollow
                    ? followUtility(element._id, user.userid)
                    : unfollowUtility(element._id, user.userid);
                  element.doYouFollow = !element.doYouFollow;
                }}
                className="text-white rounded bg-indigo-700 font-inter px-2 py-1 "
              >
                {element.doYouFollow ? "Follow" : "Unfollow"}
              </button>
            )}
            {/* {user.userid != element._id && element.doYouFollow && (
              <button
                onClick={async () => {
                  unfollowUtility(element._id, user.userid);
                }}
                className="text-white rounded bg-indigo-700 font-inter px-2 py-1 "
              >
                Unfollow
              </button>
            )} */}
          </div>
        </div>
      </div>
    );
  });
  useEffect(() => {
    if (type == "Following") {
      getFollowingUtility();
    } else if (type == "Followers") {
      getFollowersUtility();
    }
  }, []);
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
            <h1 className="text-xl font-bold">{type}</h1>
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
                className=""
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
              onClick={() => {
                handleClose();
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
