import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import {PostUser,getAlluser,getById,putUser,deleteUser, PostLogin } from "./controller/user.js"
const app = express();
app.use(express.json());
app.use(cors());
//connect mongodb

const connectDB=( async(req,res)=>{
const conn = await mongoose.connect(process.env.MONGO_URI)
if(conn){
    console.log("mongodb connected successfully✅")
}
})
connectDB();

app.post('/user',PostUser)
app.get('/getusers',getAlluser)
app.get('/getuser/:id',getById)
app.put('/updateUser/:id',putUser)
app.delete('/delete/:id',deleteUser)
app.post('/login', PostLogin)

const PORT =process.env.PORT ||5000;

app.listen(PORT,()=>{
console.log(`server is running on port ${PORT}`)
})

