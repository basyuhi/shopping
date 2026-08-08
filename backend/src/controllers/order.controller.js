const orderModel=require('../models/order.model');
const cartModel = require("../models/cart.model");
async function placeOrder(req,res){
    try{
        const userId=req.user._id;
        const cartExists=await cartModel.findOne({user:userId}).populate("items.product");
        if(!cartExists){
            return res.status(404).json({
                message:"cart does not exist"
            })
        }
        if(cartExists.items.length===0)
        {
            return res.status(400).json({
                message:"no items in the cart"
            })
        }
        const orderItems=cartExists.items.map((item)=>{
            return{
                product:item.product._id,
                seller:item.product.seller,
                quantity:item.quantity,
                price:item.product.price
            }            
        })
        
        let totalAmount=0;
        for(let i=0;i<cartExists.items.length;i++)
        {
            const item=cartExists.items[i];
            totalAmount+=item.quantity*item.product.price
        }
        const order=await orderModel.create({
            buyer:userId,
            items:orderItems,
            totalAmount:totalAmount
        })
        cartExists.items=[];
        await cartExists.save();
        return res.status(201).json({
            message: "Order placed successfully",
            order: order
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"internal server error"
        })
    }
}
async function getBuyerOrders(req,res) {
    try{
        const userId=req.user._id;
        const orderExists = await orderModel.find({ buyer: userId }).populate('items.product').sort({ createdAt: -1 });
        if(orderExists.length===0)
        {
            return res.status(200).json({
                message:"no order found",
                orders:[]
            })
        }
        res.status(200).json({
            message:"orders fetched successfully",
            orders:orderExists
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"internal server error"
        })
    }
}
async function getSellerOrders(req,res) {
    
    try{
        const userId=req.user._id;
        const orders=await orderModel.find({"items.seller":userId}).populate('items.product').sort({createdAt:-1});
        if(orders.length===0)
        {
            return res.status(200).json({
                message:"no products ordered yet"
            })
        }
        const sellerOrders=orders.map((order)=>{
            const sellerItems=order.items.filter((item)=>{
                return item.seller.toString()===userId.toString()
            })
            return {
                _id: order._id,
                buyer: order.buyer,
                items: sellerItems,
                totalAmount:order.totalAmount,
                createdAt: order.createdAt,
            }
        })
        res.status(200).json({
            message:"seller orders fetched successfully",
            sellerOrders:sellerOrders
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"internal server error"
        })
    }
}
module.exports={placeOrder,getBuyerOrders,getSellerOrders}