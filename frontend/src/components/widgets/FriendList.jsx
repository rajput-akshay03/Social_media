import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../styles/Friend";
import WidgetWrapper from "../styles/widgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state/index";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const user = useSelector((state) => state.user);
  const navigate= useNavigate();
  console.log("heyyyy");
  useEffect(()=>{
     console.log("he");
      if(!user)
      {
        console.log("his");
          navigate("/");
          // return;
      }
  },[])
  const token = useSelector((state) => state.token);
  const [friends,setFriends] = useState(null);
  const getFriends = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_backend_URL}/users/${userId}/friends`,
      {
        withCredentials: true,
        headers: {
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },
      }
    )
    // dispatch(setFriends({ friends: response.data.allFriends }));
    console.log(response.data.allFriends);
    setFriends(response.data.allFriends);
  };
  useEffect(() => {
    if(userId)
    {
      console.log("get");
      getFriends();
    }
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends!=null?friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.profession}
            userPicturePath={friend.picturePath}
          />
        )):<div></div>}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;