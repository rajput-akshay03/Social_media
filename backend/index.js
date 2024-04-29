const express=require("express");
const app = express();
const cors= require("cors")
require("dotenv").config();
const port= process.env.PORT||4000;
const {errorMiddleware} = require("./middlewares/error");
const dbConnection= require("./database/dbConnection");
const userRoutes = require("./routes/userRoutes");
const postRoutes  = require("./routes/postRoutes");
const authRoutes  = require("./routes/authRoutes");
const cloudinary  = require("./config/cloudinary");
const fileUpload=require("express-fileupload");
const bodyParser=require("body-parser");
cloudinary.cloudinaryconnect();
dbConnection();
app.use(cors({
     origin:'https://social-media-two-blond.vercel.app', 
     credentials:true,        
     optionSuccessStatus:200
 }));
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.use(fileUpload({
     useTempFiles:true,
     tempFileDir:"/temp/"
 }));
 app.use(errorMiddleware);
 app.use("/api/v1/users",userRoutes);
 app.use("/api/v1/posts",postRoutes);
 app.use("/api/v1/auth",authRoutes);
app.listen(port,()=>{
     console.log(`running on ${port}`);
})