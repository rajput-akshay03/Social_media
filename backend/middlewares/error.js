class errorHandler extends Error {
    constructor(message,statusCode){
        super(message);
        this.statusCode= statusCode;
    }
}
const errorMiddleware=(err,req,res,next)=>{
    err.message=err.message||"internal server error",
    console.log(`error is ${err}`);
     err.statusCode=err.statusCode||"internal server error"
     if(err.name==="CaseError"){
          const message= `resource not found. invalid ${err.path}`;
          err= new errorHandler(message,400);
     }
     if(err.name===11000){
        const message= `Duplicate ${Object.keys(err.keyValue)} entered`;
        err= new errorHandler(message,400);
   }
   if(err.name==="JsonWebTokenError"){
    const message= `web token is invalid.Try again`;
    err= new errorHandler(message,400);
}
if(err.name==="TokenExpiredError"){
    const message= `token expired error.`;
    err= new errorHandler(message,400);
}
   return res
//    .status(err.statusCode)
   .json({
        success:false,
        message:err.message
   })
}
module.exports={errorHandler,errorMiddleware};