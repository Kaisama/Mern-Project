///packages
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose';
//utiles
import connectDB from './config/db.js'
import userRoute from './routes/userRoute.js'

dotenv.config()
const port=process.env.PORT||3000

connectDB();

const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use("/api/users",userRoute);

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})

