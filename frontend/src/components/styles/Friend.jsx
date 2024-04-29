import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../../state/index";
import FlexBetween from "../styles/FlexBetween";
import UserImage from "../styles/userImage";
import axios from "axios";
import { useEffect } from "react";
const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(()=>{
       if(!user)
       {
          navigate("/");
          return ;
       }
  },[])
  const _id= user._id;
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
 let isFriend;
  if(friends)
  {
     isFriend = friends.find((friend) => friend._id === friendId);
  }

  const patchFriend = async () => {
    // const response = await fetch(
    //   `http://localhost:3000/api/v1/users/${_id}/${friendId}`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // console.log(token);
    const response = await axios.patch(
      `${import.meta.env.VITE_backend_URL}/users/${_id}/${friendId}`,{},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`,
        },
      }
    )
    dispatch(setFriends({ friends: response.data.allFriends }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;