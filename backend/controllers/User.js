const { Promise } = require("mongoose");
const {catchAsyncError} = require("../controllers/catchAsyncError");
const {errorHandler}= require("../middlewares/error");
const User = require("../models/userSchema");
exports.getUser= catchAsyncError(async(req,res,next)=>{
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user)
         return next(new errorHandler("User does not exist"));
       res.status(200).json({
          success:true,
          user
       });
});
exports.getUserFriends=catchAsyncError(async(req,res,next)=>{
           const {id} = req.params;
           const user=  await User.findById(id);
           if(!user)
           return next(new errorHandler("User does not exist"));     
           const friends = await Promise.all(
              user.friends.map((id)=>User.findById(id))
           );
           const allFriends = friends.map(({_id,firstName,lastName,occupation,location,picturePath})=>{
                     return {_id,firstName,lastName,occupation,location,picturePath};
           })
           res.status(200).json({
             success:true,
             allFriends
            })
})
exports.addRemoveFriend=catchAsyncError(async(req,res,next)=>{
       const {id,friendId} = req.params;
       const user =  await User.findById(id);
       const friend = await User.findById(friendId);
       if(user.friends.id.includes(friendId))
       {
         user.friends=user.friends.filter((id)=>{id!==friendId});  
         friend.friends=friend.friends.filter((id)=>{id!==id});  
       } 
       else{
          user.friends.push(friendId);
          friend.friends.push(id);
       }
       await user.save();
       await friend.save();
    const friends = await Promise.all(
        user.friends.map((id)=>User.findById(id))
     );
     const allFriends = friends.map(({_id,firstName,lastName,occupation,location,picturePath})=>{
               return {_id,firstName,lastName,occupation,location,picturePath};
     })
     res.status(200).json({
       success:true,
       allFriends
      })
});