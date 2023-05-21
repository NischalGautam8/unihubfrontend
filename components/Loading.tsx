import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function loading({ className, size }: { className?: string; size?: number }) {
  return (
    <div className={`max-h-full ${className}`}>
      <div className="flex justify-center">
        <Box>
          <CircularProgress size={size || 40} color="secondary" />
        </Box>
      </div>
    </div>
  );
}

export default loading;
////return just comment numbers not whole comments array
