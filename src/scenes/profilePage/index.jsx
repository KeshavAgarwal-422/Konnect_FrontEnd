import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import NavigationWidget from "scenes/widgets/NavigationWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isProfile = useSelector((state) => state.isProfile);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(
      `https://twitterclone-backend-sixu.onrender.com/users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {isNonMobileScreens ? <NavigationWidget /> : <></>}
          <AdvertWidget />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "37%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "37%" : undefined}>
          <FriendListWidget userId={userId} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
