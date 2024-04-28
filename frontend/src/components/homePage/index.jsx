import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../navbar/index";
import UserWidget from "../widgets/userWidget";
import MyPostWidget from "../widgets/myPostWidget";
import PostsWidget from "../widgets/postsWidget";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendList";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
   const user = useSelector((state) => state.user);
   const navigate = useNavigate();
 
   const [_id,set_id] = useState(null);
   const [picturePath,setPictruePath]= useState(null);
   console.log("hey");
   useEffect(()=>{
    console.log("hiii");
     if(!user)
     {
          navigate("/");
     }
     else{
       set_id(user._id);
       setPictruePath(user.picturePath);
     }
   },[])
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;