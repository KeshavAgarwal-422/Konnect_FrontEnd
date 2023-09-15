import React from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Paper,
  Grid,
  TextField,
  Link,
  Divider,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        width="100%"
        bgcolor={theme.palette.primary.main}
        py={2}
        textAlign="center"
      >
        <TwitterIcon style={{ fontSize: 48, color: "white" }} />
        <Typography
          variant="h4"
          component="h1"
          color="white"
          mt={2}
          fontWeight="bold"
        >
          Log in to Twitter
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p={isNonMobileScreens ? "2rem" : "1rem"} // Adjust padding for mobile screens
        m="5rem auto"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.alt}
      >
        <Typography variant="h5" fontWeight="500" sx={{ mb: "1.5rem" }}>
          Welcome back to Twitter!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
