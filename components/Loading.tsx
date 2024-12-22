import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Loading({ className, size }: { className?: string; size?: number }) {
  return (
    <div className={`flex items-center justify-center h-full ${className}`}>
      <Box>
        <CircularProgress size={size || 40} color="secondary" />
      </Box>
    </div>
  );
}

export default Loading;
