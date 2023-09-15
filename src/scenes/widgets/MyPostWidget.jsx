import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  VideoLibraryOutlined,
  CloudUploadOutlined,
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import {
  Divider,
  InputBase,
  IconButton,
  Button,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";

import Dropzone from "react-dropzone";

import { useSelector } from "react-redux";
import { setPosts } from "state";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [isClip, setIsClip] = useState(false);
  const [clipFile, setClipFile] = useState(null);
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const storage = getStorage(app);

  const handlePost = async () => {
    setIsLoading(true);

    const postObject = {
      userId: _id,
      description: post,
    };

    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytesResumable(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      postObject.picturePath = imageUrl;
    }

    if (clipFile) {
      const clipRef = ref(storage, `clips/${clipFile.name}`);
      await uploadBytesResumable(clipRef, clipFile);
      const clipUrl = await getDownloadURL(clipRef);
      postObject.clipPath = clipUrl;
    }

    const response = await fetch(
      `https://twitterclone-backend-sixu.onrender.com/posts/new/post`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postObject),
      }
    );

    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setIsClip(false);
    setClipFile(null);
    setPost("");
    setIsLoading(false);
  };

  const handleClipUpload = (acceptedFiles) => {
    setIsClip(true);
    setClipFile(acceptedFiles[0]);
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's happening?"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "1rem",
            padding: "1rem 1.5rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
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
                  {!image ? (
                    <p>Upload Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      {/* Clip upload section */}
      {!isClip && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".mp4,.avi,.mov"
            multiple={false}
            onDrop={handleClipUpload}
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
                  {!clipFile ? (
                    <Typography>Upload Clip Here</Typography>
                  ) : (
                    <FlexBetween>
                      <Typography>{clipFile.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {clipFile && (
                  <IconButton
                    onClick={() => setClipFile(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      {isLoading && (
        <Box mt="1rem" display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBetween>
        <FlexBetween justifyContent="center" gap="2rem">
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>

          <FlexBetween gap="0.25rem" onClick={() => setIsClip(!isClip)}>
            <VideoLibraryOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Clip
            </Typography>
          </FlexBetween>
        </FlexBetween>

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            minWidth: "80px",
            fontWeight: "bold",
          }}
        >
          Tweet
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
