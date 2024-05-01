const {catchAsyncError} = require("../controllers/catchAsyncError");
const {errorHandler}= require("../middlewares/error");
const User = require("../models/userSchema");
const bcrypt  = require("bcrypt");
const {sendToken}=require("../utils/jwtToken");
const cloudinary = require("cloudinary");
exports.signUp= catchAsyncError(async(req,res,next)=>{
        const {firstName,lastName,email,password,friends,location,occupation}  = req.body;
        // console.log(firstName);
        // if(!req.files || Object.keys(req.files).length ===0)
        //    return next(new errorHandler("photo file required",400));
        // if(!firstName||!lastName||!email||!password||!location||!occupation)
        //        return next(new errorHandler("please provide full details"));
        const isEmailExists= await User.findOne({email});
        if(isEmailExists)
        {
            return next(new errorHandler("email already exist"));
        }
        // const {picture} = req.files;
        // const allowedFormats = ["image/png","image/jpeg","image/webp"];
        // if(!allowedFormats.includes(picture.mimetype))
        //          return next(new errorHandler("Invalid file type. please send resume in PNG , JPG or WEBP format",400));
        // const cloudinaryResponse = await cloudinary.uploader.upload(
        //         picture.tempFilePath
        // );
        // if(!cloudinaryResponse || cloudinaryResponse.error)
        // {
        //    console.error("Cloudinary Error",cloudinaryResponse.error ||" unknown cloudinary error");
        //    return next(new errorHandler("failed to upload image",400));
        // }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);
        const user  = await User.create({
            firstName,
            lastName,
            email,
            password:passwordHash,
            picturePath:cloudinaryResponse.secure_url,
            friends,
            location,
            profession:occupation,
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
       const isPassword= await user.comparePassword(password);
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