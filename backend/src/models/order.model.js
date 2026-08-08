const mongoose=require('mongoose');
const orderSchema=new mongoose.Schema({
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    items:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "product",
            required:true,
        },
        seller:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true,
        },
        quantity:{
            type:Number,
            required:true,
            min:1
        },
        price:{
            type:Number,
            required:true,
            min:0
        }
    }],
    totalAmount:{
        type:Number,
        required:true,
    }
},{timestamps:true})
const orderModel=mongoose.model("order",orderSchema);
module.exports=orderModel