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
app.use(errorMiddleware);
app.use(express.json());
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/post",postRoutes);
app.use("/api/v1/auth",authRoutes);
app.use(cors());
dbConnection();
app.listen(port,()=>{
     console.log(`running on ${port}`);
})