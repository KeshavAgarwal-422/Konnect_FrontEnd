import React, { useState, useEffect } from "react";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  TextareaAutosize,
  CircularProgress,
} from "@mui/material";
import Dropzone from "react-dropzone";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import app from "../../firebase";
import {
  ChatBubbleOutlineOutlined,
  CloudUploadOutlined,
  DeleteOutlineOutlined,
  DeleteOutlined,
  EditOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  clipPath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedImageFile, setUpdatedImageFile] = useState(null);
  const [updatedVideoFile, setUpdatedVideoFile] = useState(null);
  const [updatedImageURL, setUpdatedImageURL] = useState(picturePath);
  const [updatedClipURL, setUpdatedClipURL] = useState(clipPath);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(
      `https://twitterclone-backend-sixu.onrender.com/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const openUpdateDialog = () => {
    setIsUpdateDialogOpen(true);
  };

  const closeUpdateDialog = () => {
    setIsUpdateDialogOpen(false);
  };
  const storage = getStorage(app);
  const handleUpdatePost = async () => {
    setIsLoading(true);

    if (updatedImageFile) {
      const imageRef = storageRef(
        storage,
        `images/${postId}/${updatedImageFile.name}`
      );
      const uploadTask = uploadBytesResumable(imageRef, updatedImageFile);
      await uploadTask;
      const imageUrl = await getDownloadURL(imageRef);
      console.log(imageUrl);
      setUpdatedImageURL(imageUrl);
    }

    if (updatedVideoFile) {
      const clipRef = storageRef(
        storage,
        `clips/${postId}/${updatedVideoFile.name}`
      );
      const uploadTask = uploadBytesResumable(clipRef, updatedVideoFile);
      await uploadTask;
      const clipUrl = await getDownloadURL(clipRef);
      console.log(clipUrl);
      setUpdatedClipURL(clipUrl);
    }

    const updatedData = {
      description: updatedDescription,
      picturePath: updatedImageURL,
      clipPath: updatedClipURL,
    };

    const response = await fetch(
      `https://twitterclone-backend-sixu.onrender.com/posts/${postId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (response.status === 200) {
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
      setUpdatedImageFile(null);
      setUpdatedVideoFile(null);
      setIsLoading(false);
      closeUpdateDialog();
    } else {
      console.error("Failed to update post");
    }
  };

  const DeletePost = async () => {
    const response = await fetch(
      `https://twitterclone-backend-sixu.onrender.com/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const DeletePost = await response.json().then(window.location.reload());
  };

  useEffect(() => {
    if (navigator.share) {
      const shareButton = document.querySelector("#shareButton");

      shareButton.addEventListener("click", async () => {
        try {
          await navigator.share({
            title: "Share this post",
            text: "Check out this post!",
            url: "https://localhost:3000/home",
          });
          console.log("Post shared successfully");
        } catch (error) {
          console.error("Error sharing the post:", error);
        }
      });
    }
  }, []);

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem", ml: "0.6rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={picturePath}
        />
      )}
      {clipPath && (
        <video
          width="100%"
          height="auto"
          controls
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        >
          <source src={clipPath} type="video/mp4" />
          <source src={clipPath} type="video/avi" />
          <source src={clipPath} type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <FlexBetween>
          <IconButton onClick={() => DeletePost()}>
            <DeleteOutlineOutlined />
          </IconButton>
          <IconButton onClick={() => openUpdateDialog()}>
            <EditOutlined />
          </IconButton>
          <IconButton id="shareButton">
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}

      {/* Add the update post dialog */}
      <Dialog open={isUpdateDialogOpen} onClose={closeUpdateDialog}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextareaAutosize
            placeholder="Edit Post..."
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <Box border={`1px solid `} borderRadius="5px" mt="1rem" p="1rem">
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setUpdatedImageFile(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!updatedImageFile ? (
                      <p>Upload New Image Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{updatedImageFile.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {updatedImageFile && (
                    <IconButton
                      onClick={() => setUpdatedImageFile(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
          <Box border={`1px solid `} borderRadius="5px" mt="1rem" p="1rem">
            <Dropzone
              acceptedFiles=".mp4,.avi,.mov"
              multiple={false}
              onDrop={(acceptedFiles) => setUpdatedVideoFile(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!updatedVideoFile ? (
                      <Typography>Upload New Clip Here</Typography>
                    ) : (
                      <FlexBetween>
                        <Typography>{updatedVideoFile.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {updatedVideoFile && (
                    <IconButton
                      onClick={() => setUpdatedVideoFile(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>

          {isLoading && (
            <Box mt="1rem" display="flex" justifyContent="center">
              <CircularProgress color="primary" />
            </Box>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdatePost}
            sx={{ marginTop: "1rem", width: "100%" }}
          >
            Update
          </Button>
        </DialogContent>
      </Dialog>
    </WidgetWrapper>
  );
};

export default PostWidget;
