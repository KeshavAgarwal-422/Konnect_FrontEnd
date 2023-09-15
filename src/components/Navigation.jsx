import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { setIsProfile } from "state";

const Navigation = ({ icon, text, route, active, setActiveTab }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  return (
    <Box
      onClick={() => {
        setActiveTab(route);
        if (route === "/tweet") {
          dispatch(setIsProfile({ isProfile: true }));
        } else if (route === "/home") {
          dispatch(setIsProfile({ isProfile: false }));
        }
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        paddingLeft: "15%",
        color: active ? palette.primary.main : undefined,
        "&:hover": {
          cursor: "pointer",
          color: palette.neutral.main,
        },
      }}
    >
      {icon}
      <Box
        sx={{
          paddingLeft: "2rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight="600">
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default Navigation;
