import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import asyncHandler from "express-async-handler";
import routes from './routes/routes.js';
import path from 'path';

const app = express()
app.use(express.json())
const __dirname = path.resolve();
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });
}

app.listen(port,()=>{
    console.log(`Server started on ${port}`)
    connetDB()
})