import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../styles/Friend";
import WidgetWrapper from "../styles/widgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state/index";
import axios from "axios";
const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const getFriends = async () => {
    // const response = await fetch(
    //   `http://localhost:3000/api/v1/users/${userId}/friends`,
    //   {
    //     method: "GET",
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    // ).then((resp)=>{
    //   // check again
    //   dispatch(setFriends({ friends: [] }));
    // })
    const response = await axios.get(
      `http://localhost:3000/api/v1/users/${userId}/friends`,
      {
        withCredentials: true,
        headers: {
          Authorization:`Bearer ${token}`
        },
      }
    )
    dispatch(setFriends({ friends: response.data.allFriends }));
    console.log(response.data.allFriends);
  };
  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        {friends?friends.map((friend) => (
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