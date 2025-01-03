import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import { decode } from 'punycode';
import { createOrder } from './controllers/oderController.js';
import orderRouter from './routes/oderRouter.js';
dotenv.config()
const app = express();
const mongoUrl = process.env.MONGO_DB_URI;
import cors from "cors"

app.use(cors())

 
// Connect to MongoDB
mongoose.connect(mongoUrl, {})
  .then(() => { 
    console.log("Database Connected");
  })
  .catch((error) => { 
    console.error("Database connection error:", error);
  });
 
  app.use(bodyParser.json());
  app.use((req, res, next) => { //start decript data by making a own midleware like bodypaseer
  console.log(req)
  const token = req.header("Authorization")?.replace("Bearer ", "")

   
   


if (token != null) {
     jwt.verify(token,process.env.SECRET, (error, decoded) => {
       if (!error) {  
          console.log(decoded)
          req.user= decoded
          
       }else{
        console.log("There is a error in decoding token")
       }
  }) 
 }
 next()
});
  



// Define routes


app.use('/user',userRouter);
app.use('/product',productRouter) 
app.use('/oder',orderRouter)



// Start the server 
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
