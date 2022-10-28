require("dotenv").config()

const express= require("express")
const mongoose=require("mongoose")

mongoose.connect(process.env.DATABASE_URL,)
const app=express()


const db=mongoose.connection    
db.on("error",(error)=>console.log(error))
db.once("open",()=>console.log("Connected to database"))

app.use(express.json())

const authRoutes=require("./routes/auth")
app.use("/auth",authRoutes)

app.listen(3000,(()=>{console.log("server started")}))
