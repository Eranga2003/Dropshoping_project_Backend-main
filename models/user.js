import mongoose  from "mongoose";
import { type } from "os";


const userschema = mongoose.Schema({
    email:{
       type:String,
       required:true,
       unique:true
    },
 
    firstName:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true  
    },

    password:{
        type:String,
        required:true
    },

    isblocked:{
        type:Boolean,
        default:false
    },
    type:{
        type:String,
        default:"User"
    },
    profileimage:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png"
    }
})

 const User = mongoose.model("users",userschema)

 export default User;

 