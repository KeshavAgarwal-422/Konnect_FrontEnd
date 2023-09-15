import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AvailableFriendsWidge = ({ userId }) => {
  const [allUsers, setAllUsers] = useState(null);
  const { palette } = useTheme();

  const getAllFriends = async () => {
    const response = await fetch(
      `https://twitterclone-backend-sixu.onrender.com/users`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    const AllUsers = data?.filter?.((user) => user._id !== userId);
    setAllUsers(AllUsers);
  };

  useEffect(() => {
    getAllFriends();
  }, []);

  return (
    <WidgetWrapper mt="2rem">
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Available Friends List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {allUsers?.length > 0 ? (
          allUsers.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))
        ) : (
          <Typography
            color={palette.neutral.main}
            variant="h5"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            0 Available Friends
          </Typography>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default AvailableFriendsWidge;
