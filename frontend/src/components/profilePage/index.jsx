import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../navbar/index";
import FriendListWidget from "../widgets/FriendList";
import MyPostWidget from "../widgets/myPostWidget";
import PostsWidget from "../widgets/postsWidget";
import UserWidget from "../widgets/userWidget";
import axios from "axios";
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const getUser = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_backend_URL}/users/${userId}`,
      {
        withCredentials: true,
        headers: {
          Authorization:`Bearer ${token}`
        },
      }
    )
    setUser(response.data.user);
  };

  useEffect(() => {
    if(userId)
    {
      getUser();
    }
    if (!userId) {
      navigate("/");
     
    }
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps
  const navigate= useNavigate();
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
          <UserWidget userId={userId} picturePath={user?user.picturePath:null} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user?user.picturePath:null} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
