const express=require("express");
const mysql=require("mysql");
const cors=require("cors");
require("dotenv").config();

const app=express();

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Kinjal099",
    database:"recipes"
})

app.use(cors());
app.use(express.json());

app.get("/user",(req,res)=>{
    const q="SELECT * FROM user";
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(process.env.PORT,async()=>{
    try{
        console.log("Server is running")
    }catch(err){
        console.log(err)
    }
})