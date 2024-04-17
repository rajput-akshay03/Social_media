const cloudinary  = require("cloudinary").v2;
require("dotenv").config();
exports.cloudinaryconnect = ()=>{
    try{
              cloudinary.config(
                {
                    cloud_name:process.env.CLOUD_NAME,
                    api_key:process.env.API_KEY,
                    api_secret:process.env.API_SECRET
                }
              )
              console.log("jai shree ram");
    }
    catch(err)
    {
          console.log(err);
    }
}