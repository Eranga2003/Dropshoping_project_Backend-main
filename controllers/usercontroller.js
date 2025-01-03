import User from '../models/user.js'; 
import bcrypt from "bcrypt";
import { sign } from 'crypto';
export default createUser
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


export function createUser(req,res){

    const newUserData = req.body

if(newUserData.type == "admin"){
  
      if(req.user==null){
        res.json({
          message: "Please login as administrator to create admin accounts 1"
        })
        return
      }
  
      if(req.user.type != "admin"){
        res.json({
          message: "Please login as administrator to create admin accounts 2"
        })
        return
      }
  
    }
  
    newUserData.password = bcrypt.hashSync(newUserData.password, 10)  

    const UserInterface    = new User (req.body) ;
    UserInterface.save().then ((result)=>{
        res.json({massge:"user created successfully"});
    })
    
    .catch ((error)=>{
        console.log(error)
        res.json({massage:"user not created"});
    })
    

 
} 
export function loginUser(req, res) {
    console.log(req.body);

    User.find({ email: req.body.email }).then((users) => { // Correct variable name here
        if (users.length == 0) {
            res.json({
                message: "User not found"
            });
        } else {
           
            const user = users[0]; // Use 'user' here


            // Corrected: 'req.body.password' instead of 'res.body.password'
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

            if (isPasswordCorrect) {
                
                const token =jwt.sign({
                    email:user.email,
                    firstName:user.firstName,
                    LastName:user. LastName,
                    isblocked:user.isblocked,
                    type:user.type,
                    profileimage:user. profileimage

                },process.env.SECRET,
            )
            console.log(token)

           res.json({
            massage:"user login token is ",
            token:token ,
            user:{
               firstName:user.firstName,
               LastName:user.LastName,
               type:user.type,
               profileimage:user.profileimage,
               email:user.email

            }
              
            

            
           })

            } else { 
                res.json({
                    message: "Password incorrect, input correct password"
                });
            }
        }
    }).catch((error) => {
        res.status(500).json({ message: "Error occurred", error: error.message });
    });
}


export function isAdmin(req){
    if(req.user==null){
      return false
    }
  
    if(req.user.type != "admin"){
      return false
    }
  
    return true
  }
  
  export function isCustomer(req){
    if(req.user==null){
      return false
    }
  
    if(req.user.type != "customer"){
      return false
    }
  
    return true
  }

 
  //john3.smith@example.com - admin
  //Password123! -passwerd

  //john1.smith@example.com -user 
  //Password123!   -password