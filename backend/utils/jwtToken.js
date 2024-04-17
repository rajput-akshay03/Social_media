const sendToken=(user,statusCode,res,message)=>{
       const token = user.getJwtToken();
       res.status(statusCode).json({
        success:true,
        user,
        message,
        token
       });

}
module.exports= {sendToken};