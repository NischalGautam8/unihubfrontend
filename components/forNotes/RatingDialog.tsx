import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { rateNote } from "@/apicalls/apicalls";
import { Rating } from "@mui/material";
import toast from "react-hot-toast";
import router from "@/../unihubbackend/src/route/auth";
import { useRouter } from "next/router";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  setRatingModelVisible,
  ratingModelVisible,
  ratingValue,
  userid,
}: {
  setRatingModelVisible: Function;
  ratingModelVisible: boolean;
  ratingValue: number;
  userid: string;
}) {
  const [open, setOpen] = React.useState(ratingModelVisible);
  const [toratevalue, setToRateValue] = React.useState(ratingValue);
  const router = useRouter();
  console.log(router.query.id, "queery");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setRatingModelVisible(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div style={{ backgroundColor: "black" }}>
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <Rating
              name="simple-controlled"
              value={toratevalue}
              precision={0.5}
              onChange={(event, newValue) => {
                // setRatingMode(true);
                setToRateValue(newValue || 0);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={async () => {
                await rateNote(router.query.id, userid, toratevalue);
                toast.success(" Sucessfull rated");

                handleClose();
              }}
            >
              Rate
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
