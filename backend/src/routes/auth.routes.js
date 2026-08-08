const express=require("express");
const {BuyerSignup,BuyerLogin,SellerLogin,SellerSignup, getCurrentUser, logout}=require('../controllers/auth.controller')
const verifyUser=require('../middleware/auth.middleware');
const upload=require('../middleware/multer.middleware')
const router=express.Router();

router.post('/buyer/signup',upload.single('profileImage'),BuyerSignup);
router.post('/buyer/login',BuyerLogin);
router.post('/seller/signup',upload.single('profileImage'),SellerSignup);
router.post("/seller/login",SellerLogin);

router.post('/logout',verifyUser,logout) 
router.get('/me', verifyUser, getCurrentUser);
module.exports=router;