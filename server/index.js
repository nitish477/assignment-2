import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import asyncHandler from "express-async-handler";
import routes from './routes/routes.js';

const app = express()
app.use(express.json())

const connetDB= asyncHandler(async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        if(conn){
            console.log("MongoDB Connected...")
        }
    } catch (error) {
         console.log(error.message)
    }
})

app.use('/api/v1',routes)

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Server started on ${port}`)
    connetDB()
})