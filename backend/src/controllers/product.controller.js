const productModel=require('../models/product.model');
const {uploadFile}=require('../services/storage.service')
const mongoose=require('mongoose');
async function createProduct(req,res){
    try{
        const{title,description,price,category}=req.body;
        if(!title||!description||price===undefined||price===null||!category)
        {
            return res.status(400).json({
                message:"Incomplete information"
            })
        }
        if (Number(price) < 0) {
            return res.status(400).json({
                message: "Price cannot be negative"
            });
        }
        if (!req.file) {
            return res.status(400).json({
                message: "Product image is required"
            });
        }
        const result=await uploadFile(req.file.buffer.toString('base64'));
        
        const product=await productModel.create({
            title:title,
            description:description,
            price:price,
            category:category,
            seller: req.user._id,
            image:result.url
        })
        res.status(201).json({
            message:"product created successfully",
            product:product,
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"internal server error"
        })
    }
}
async function getAllProducts(req,res){
    try{
        const category = req.query.category;
        const filter={};
        if(category)
        {
            filter.category=category;
        }
        const products=await productModel.find(filter).sort({createdAt:-1});
        res.status(200).json({
            message:"products fetched successfully",
            products:products
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
async function getProductsById(req,res) {
    try{
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }
        const product=await productModel.findById(id);
        if(!product)
        {
            return res.status(404).json({
                message:"product not found"
            })
        }
        return res.status(200).json({
            message:"product found",
            product:product
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
async function getSellerProducts(req,res){
    try{
        const products=await productModel.find({seller:req.user._id}).sort({createdAt:-1});
        if(!products)
        {
            return res.status(400).json({
                message:"no products yet"
            })
        }
        res.status(200).json({
            message: "Seller products fetched successfully",
            products: products
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
async function deleteProduct(req,res) {
    try{
        const id=req.params.id;
        const product=await productModel.findById(id);
        if(!product)
        {
            return res.status(404).json({
                message:"product not found"
            })
        }
        if(product.seller.toString()!==req.user._id.toString())
        {
            return res.status(403).json({
                message:"not allowed to delete product"
            })
        }

        await productModel.findByIdAndDelete(id);

        res.status(200).json({
            message:"product deleted successfully",
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"failure in deleting product"
        })
    }
}
module.exports={createProduct,getAllProducts,getProductsById,getSellerProducts,deleteProduct};