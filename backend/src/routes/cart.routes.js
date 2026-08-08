const express=require("express");
const {addToCart,getCart,updateQuantity,removeItem}=require("../controllers/cart.controller");
const verifyUser=require("../middleware/auth.middleware");
const verifyBuyer=require("../middleware/buyer.middleware")
const router=express.Router();

router.post("/add",verifyUser,verifyBuyer,addToCart);
router.get("/",verifyUser,verifyBuyer,getCart);
router.patch('/update/:productId',verifyUser,verifyBuyer,updateQuantity)
router.delete('/remove/:productId',verifyUser,verifyBuyer,removeItem)

module.exports=router;