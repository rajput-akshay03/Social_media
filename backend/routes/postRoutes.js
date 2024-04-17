const express=require("express");
const {createPost,getFeedPosts,getUserPosts,likePost}=require("../controllers/post");
const { isAuthorized } = require("../middlewares/Auth");
const router=express.Router();
router.get("/",isAuthorized,getFeedPosts);
router.get("/:userId/posts",isAuthorized,getUserPosts);
router.patch("/:id/like",isAuthorized,likePost);
router.post("/",isAuthorized,createPost);
module.exports=router;