const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum: ["buyer", "seller"],
        required:true,
        default:"buyer"
    },
    profileImage:{
        type:String,
        default:""
    }
})
const userModel=mongoose.model("user",userSchema);
module.exports=userModel;