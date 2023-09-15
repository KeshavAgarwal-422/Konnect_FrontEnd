import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import WidgetWrapper from "components/WidgetWrapper";
import { Typography, useTheme } from "@mui/material";

const PostsWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const isProfile = useSelector((state) => state.isProfile);
  const friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();
  const getPosts = async () => {
    const response = await fetch(
      `https://twitterclone-backend-sixu.onrender.com/posts/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `https://twitterclone-backend-sixu.onrender.com/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isProfile, friends]);

  return (
    <>
      {posts?.length > 0 ? (
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            clipPath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              clipPath={clipPath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )
      ) : (
        <WidgetWrapper
          sx={{
            marginTop: "2rem",
            padding: "1rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            color={palette.neutral.main}
            variant="h5"
            fontWeight="600"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            No Posts
          </Typography>
        </WidgetWrapper>
      )}
    </>
  );
};

export default PostsWidget;
