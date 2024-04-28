import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import DeleteIcon from '@mui/icons-material/Delete';
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import FlexBetween from "../styles/FlexBetween";
  import Friend from "../styles/Friend";
  import WidgetWrapper from "../styles/widgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "../../state/index";
  import axios from "axios";
  const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    isProfile
  }) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const [isLiked,setisLiked]=useState(Boolean(likes[loggedInUserId]));
    const [likeCount,setlikeCount]= useState( Object.keys(likes).length)
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const patchLike = async () => {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/posts/${postId}/like`,
        {userId: loggedInUserId},
        {
          withCredentials: true,
          headers: {
            Authorization:`Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      if(isLiked)
      {
         setisLiked(false);
         setlikeCount(likeCount-1);
      }
      else{
        setisLiked(true);
        setlikeCount(likeCount+1);
      }
      dispatch(setPost({ post: response.data.updatePost }));
    };
    const deletePost=async()=>{
        const check= confirm("Do you want to delete the post?")
        if(check)
        {
          const response = await axios.delete(
            `http://localhost:3000/api/v1/posts/delete/${postId}`,
            {
              withCredentials: true,
              headers: {
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
              },
            }
          )
          dispatch(setPost({ post: response.data.post }));
        }
    }
  
    return (
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`${picturePath}`}
          />
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
            <IconButton>
              {
                  isProfile?<DeleteIcon onClick={deletePost}/>:<div></div>
              }
            </IconButton>
            </FlexBetween>
          </FlexBetween>
          <IconButton>
            <ShareOutlined />
          </IconButton>
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
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;