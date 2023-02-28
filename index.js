const express=require("express");
const connection = require("./Config/db");
const olxRouter = require("./Routes/PostClassifieds");
const cors=require("cors");
require("dotenv").config();

const app=express();

app.use(express.json());

app.use(cors({
    origin:"*"
}));

app.get("/",(req,res)=>{
    res.send("Home Page   /product");
});

app.use("/product",olxRouter);

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("Connected to DB");
    } catch(err){
        console.log(err);
        console.log("Not Connected to DB");
    }
    console.log(`Server is running at port ${process.env.port}`);
});