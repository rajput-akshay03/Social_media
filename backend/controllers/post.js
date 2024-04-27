const {catchAsyncError} = require("../controllers/catchAsyncError");
const {errorHandler}= require("../middlewares/error");
const Post= require('../models/postSchema');
const User= require("../models/userSchema");
const cloudinary = require("cloudinary");
exports.createPost  = catchAsyncError(async(req,res,next)=>{
          const {userId,description}= req.body;
          console.log("hello");
        //   const {picture} = req.files;
        //   const allowedFormats = ["image/png","image/jpeg","image/webp"];
        //   if(!allowedFormats.includes(resume.mimetype))
        //            return next(new errorHandler("Invalid file type. please send resume in PNG , JPG or WEBP format",400));
        //   const cloudinaryResponse = await cloudinary.uploader.upload(
        //           picture.tempFilePath
        //   );
        //   if(!cloudinaryResponse || cloudinaryResponse.error)
        //   {
        //      console.error("Cloudinary Error",cloudinaryResponse.error ||" unknown cloudinary error");
        //      return next(new errorHandler("failed to upload image",400));
        //   }
          const user = await User.findById(userId);
          const newPost = await Post.create({
              userId,
              firstName:user.firstName,
              lastName:user.lastName,
              location:user.location,
              description,
            //   userPicturePath:user.picturePath,
            //   picturePath:cloudinaryResponse.secure_url,
              likes:{},
              comments:[]
          })
        const post = await Post.find().sort({updatedAt:-1});
          return res.status(200).json({
                success:true,
                message:"posted successfully",
                post
          })
});
exports.getFeedPosts= catchAsyncError(async(req,res,next)=>{
    const post = await Post.find().sort({updatedAt:-1});
    return res.status(200).json({
          success:true,
          post
    })
});
exports.getUserPosts = catchAsyncError(async(req,res,next)=>{
    const {userId} = req.params;

    const post = await Post.find({userId}).sort({updatedAt:-1});
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
          message:"post liked",
          updatePost
    })
});
exports.deletePost = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params;
    console.log(id);
    const posts= await Post.findById(id)
    console.log(posts);
    if(!posts)
        return next(new errorHandler("post not found"));
    await posts.deleteOne();
    const post = await Post.find().sort({updatedAt:-1});
    return res.status(200).json({
          success:true,
          message:"post deleted succesfully",
          post
    })
});
