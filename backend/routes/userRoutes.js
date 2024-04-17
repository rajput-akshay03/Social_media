const express=require("express");
const {getUser,getUserFriends,addRemoveFriend}=require("../controllers/User");
const { isAuthorized } = require("../middlewares/Auth");
const router=express.Router();
router.get("/:id",isAuthorized,getUser);
router.get("/:id",isAuthorized,getUserFriends);
router.patch("/:id/:friendId",isAuthorized,addRemoveFriend);
module.exports=router;