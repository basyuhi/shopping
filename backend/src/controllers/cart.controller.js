const cartModel=require('../models/cart.model');
const productModel=require("../models/product.model")
async function addToCart(req,res){
    try{
        const {productId,quantity}=req.body;
        if(!productId||quantity===null||quantity===undefined)
        {
            return res.status(400).json({
                message:"incomplete request"
            })
        }
        if(Number(quantity)<0)
        {
            return res.status(400).json({
                message: "Quantity cannot be negative"
            })
        }
        if(Number(quantity)===0)
        {
            return res.status(400).json({
                message:"Quantity must be greater than zero"
            })
        }

        const productExists= await productModel.findById(productId);

        if(!productExists)
        {
            return res.status(404).json({
                message:"product not found"
            })
        }

        const userId=req.user._id;
        const cartExists = await cartModel.findOne({user:userId});
        if(!cartExists)
        {
            const cart=await cartModel.create({
                user:userId,
                items:[{
                    product:productId,
                    quantity:quantity
                }]
            })
            return res.status(201).json({
                message: "cart created successfully",
                cart: cart,
            })
        }
        
        const existingItem=cartExists.items.find((item)=>{
            return item.product.toString()===productId.toString()
        })

        if(existingItem)
        {
            existingItem.quantity += Number(quantity);
        }
        else{
            cartExists.items.push({
                product: productId,
                quantity: Number(quantity)
            });
        }
        await cartExists.save();

        return res.status(200).json({
            message: "Cart updated successfully",
            cart: cartExists
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"internal server error"
        })
    }
}
async function getCart(req,res) {
    try{
        const userId=req.user._id;
        const cartExists=await cartModel.findOne({user:userId}).populate("items.product");
        if(!cartExists)
        {   
            return res.status(404).json({
                message:"cart not found"
            })
        }   

        return res.status(200).json({
            message:"Cart found successfully",
            cart:cartExists
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"internal server error"
        })
    }
}
async function updateQuantity(req,res) {
    try{
        const {productId} = req.params
        const {quantity} = req.body
        if(quantity===null || quantity===undefined)
        {
            return res.status(401).json({
                message:"invalid value entered"
            })
        }
        if(quantity<=0)
        {
            return res.status(400).json({
                message:"quantity should be greater than zero"
            })
        }
        
        const userId=req.user._id;

        const cartExists=await cartModel.findOne({user:userId});

        if(!cartExists){
            return res.status(404).json({
                message:"cart does not exists"
            })
        }
        const existingItem=cartExists.items.find((item)=>{
            return item.product.toString()===productId.toString()
        })
        if(!existingItem)
        {
            return res.status(404).json({
                message:"cart item does not exist"
            })
        }
        existingItem.quantity=Number(quantity);
        await cartExists.save();
        
        await cartExists.populate("items.product");

        res.status(200).json({
            message:"cart updated successfully",
            cart:cartExists
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"internal server error"
        })
    }
}
async function removeItem(req, res) {
    try {
        const { productId } = req.params;
        const userId = req.user._id;

        let cartExists = await cartModel.findOne({ user: userId });// use let so we can reassign later

        if (!cartExists) {
            return res.status(404).json({
                message: "cart does not exists"
            });
        }

        const existingItem = cartExists.items.find((item) => {
            return item.product.toString() === productId.toString();
        });

        if (!existingItem) {
            return res.status(404).json({
                message: "Cart item does not exist"
            });
        }

        const newCart = cartExists.items.filter((item) => {
            return item.product.toString() !== productId.toString();
        });

        cartExists.items = newCart;
        await cartExists.save();

        cartExists = await cartModel.findOne({ user: userId }).populate('items.product');// this will work now

        res.status(200).json({
            message: "cart product deleted successfully",
            cart: cartExists
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "internal server error"
        });
    }
}
module.exports={addToCart,getCart,updateQuantity,removeItem};