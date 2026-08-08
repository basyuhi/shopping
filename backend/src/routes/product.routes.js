const verifyUser=require('../middleware/auth.middleware');
const verifySeller=require('../middleware/seller.middleware');
const {createProduct,getAllProducts,getProductsById,getSellerProducts,deleteProduct}=require('../controllers/product.controller');
const express=require('express');
const upload=require('../middleware/multer.middleware')
const router=express.Router();

router.post('/create',verifyUser,verifySeller,upload.single('image'),createProduct);

router.get("/seller/myproducts",verifyUser,verifySeller,getSellerProducts);
router.get('/',getAllProducts);
router.get('/:id',getProductsById);

router.delete('/:id',verifyUser,verifySeller,deleteProduct);
module.exports=router;