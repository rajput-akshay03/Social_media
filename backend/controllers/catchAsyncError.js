const catchAsyncError = (errorFunction)=>{
    return(req,res,next)=>{
        Promise.resolve(errorFunction(req,res,next)).catch(next);
    };
}
module.exports={catchAsyncError};