const {catchAsyncError} = require("../controllers/catchAsyncError");
const {errorHandler}= require("../middlewares/error");
const User = require("../models/userSchema");
const bcrypt  = require("bcrypt");
const {sendToken}=require("../utils/jwtToken");
exports.signUp= catchAsyncError(async(req,res,next)=>{
        const {firstName,lastName,email,password,picturePath,friends,location,occupation}  = req.body;
         const isEmailExists= await User.findOne({email});
        if(isEmailExists)
        {
            return next(new errorHandler("email already exist"));
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);
        const user  = await User.create({
            firstName,
            lastName,
            email,
            password:passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile:Math.floor(Math.random()*10000),
            impressions:Math.floor(Math.random()*10000)
        })
        res.status(200).json({
         success:true,
         user
        });
});
exports.login=catchAsyncError(async(req,res,next)=>{
       const {email,password}=req.body;
       if(!email||!password)
       {
          return next(new errorHandler("please fill form completely"));
       }
       const user=await User.findOne({email}).select("+password");
       if(!user)
       {
            return next(new errorHandler("invalid email or password",400));
       }
       const isPassword= await User.comparePassword(password);
       if(!isPassword)
           return next(new errorHandler("invalid email or password",400));
       sendToken(user,200,res,"User logged in successfully");
})
// exports.logout=catchAsyncError(async(req,res,next)=>{
//     res.status(201).cookie("token","",{
//         httpOnly:true,
//         expires: new Date(Date.now())
//      }).json({
//         success:true,
//         message:"User logged out successfully"
//      })
// });