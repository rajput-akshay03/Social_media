const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const postSchema=mongoose.Schema({
     userId:{
         type:String,
         required:true
     },
     firstName:{
      type:String,
      required:[true,"must provide your name"],
      minLength:[3,"must contain 3 characters"],
      maxLenght:[30,"must contain 30 characters"]
     },
    lastName:{
       type:String,
       required:[true,"must provide your name"],
       minLength:[3,"must contain 3 characters"],
       maxLenght:[30,"must contain 30 characters"]
      },
    location:String,
    description:String,
    picturePath:String,
    userPicturePath:String,
    likes:{
       type:Map,
       of:Boolean
    },
    comments:{
       type:Array,
       default:[]
    }
},
   {timestamps:true}
);
module.exports= mongoose.model("Post",postSchema);