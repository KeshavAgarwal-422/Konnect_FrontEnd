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
import Groups2Icon from "@mui/icons-material/Groups2";
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
        <Groups2Icon style={{ fontSize: 48, color: "white" }} />
        <Typography
          variant="h4"
          component="h1"
          color="white"
          mt={2}
          fontWeight="bold"
        >
          Log in to Konnect
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p={isNonMobileScreens ? "2rem" : "1rem"}
        m="5rem auto"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.alt}
      >
        <Typography variant="h5" fontWeight="500" sx={{ mb: "1.5rem" }}>
          Welcome back to Konnect!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
