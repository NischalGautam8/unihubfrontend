import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function loading() {
  return (
    <div>
      <div
        style={{ backgroundColor: "#000000" }}
        className="flex justify-center  my-10 "
      >
        <Box sx={{ display: "" }}>
          <CircularProgress color="secondary" />
        </Box>
      </div>
    </div>
  );
}

export default loading;
////return just comment numbers not whole comments array
