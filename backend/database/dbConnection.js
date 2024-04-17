const mongoose=require("mongoose");
const dbConnection=()=>{
       mongoose.connect(process.env.MONGO_URL
       ).then(()=>{
           console.log("database connected");
       }
       ).catch((err)=>{
              console.log(`error while connected in database ${err}`);
       })
}
module.exports=dbConnection;