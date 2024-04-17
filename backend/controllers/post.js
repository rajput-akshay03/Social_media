const {catchAsyncError} = require("../controllers/catchAsyncError");
const {errorHandler}= require("../middlewares/error");
const Post= require('../models/postSchema');
const User= require("../models/userSchema")
exports.createPost  = catchAsyncError(async(req,res,next)=>{
          const {userId,description,picturePath}= req.body;
          const user = await User.findById(userId);
          const newPost = await Post.create({
              userId,
              firstName:user.firstName,
              lastName:user.lastName,
              location:user.location,
              description,
              userPicturePath:user.picturePath,
              picturePath,
              likes:{},
              comments:[]
          })
        const post = await Post.find();
          return res.status(200).json({
                success:true,
                message:"posted successfully",
                post
          })
});
exports.getFeedPosts= catchAsyncError(async(req,res,next)=>{
    const post = await Post.find();
    return res.status(200).json({
          success:true,
          post
    })
});
exports.getUserPosts = catchAsyncError(async(req,res,next)=>{
    const {userId} = req.params;

    const post = await Post.find({userId});
    return res.status(200).json({
          success:true,
          post
    })
});
exports.likePost = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params;
    const {userId} = req.body;
     const post = await Post.findById(id);
     const isLiked=post.likes.get(userId); 
     if(isLiked)
     {
        post.likes.delete(userId);
     }else{
        post.likes.set(userId,true);
     }
     const updatePost = await Post.findByIdAndUpdate(
        id,
        {likes:post.likes},
        {new:true}
     )
    
    return res.status(200).json({
          success:true,
          message:"post deleted succesfully",
          updatePost
    })
});
// exports.deletePost = catchAsyncError(async(req,res,next)=>{
//     const {id} = req.params;
//     //chack here
//     const posts= await Post.findById(id)
//     if(!posts)
//         return next(new errorHandler("post not found"));
//     await posts.deleteOne();
//     return res.status(200).json({
//           success:true,
//           message:"post deleted succesfully"
//     })
// });
