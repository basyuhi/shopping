const userModel=require('../models/user.model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const {uploadFile}=require('../services/storage.service')
async function BuyerSignup(req,res){
    try{
        const {username,email,password}=req.body;
        if(!username || !email || !password)
        {
            return res.status(400).json({
                message:"bad request"
            })
        }
        const userExists=await userModel.findOne({
            $or:[{username},{email}]
        })
        if(userExists)
        {
            return res.status(409).json({
                message: "buyer already exists"
            })
        }
        let profileImage="";
        if(req.file){
            const result = await uploadFile(req.file.buffer.toString('base64'))
            profileImage = result.url;
        }
        const hash=await bcrypt.hash(password,10);
        const user=await userModel.create({
            username:username,
            email:email,
            password:hash,
            profileImage:profileImage,
            role:"buyer"
        })
        const token = jwt.sign({
                    id: user._id,
                    role:user.role
                }, process.env.JWT_SECRET)
        
        res.cookie("token", token);

        res.status(201).json({
            message: "buyer signup successfull",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                role:user.role
            }
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "internal server error"
        })
    }
}
async function BuyerLogin(req, res) {
    try{
        const {username,email,password}=req.body;
        if((!username && !email) || !password)
        {
            return res.status(400).json({
                message:"bad request"
            })
        }
        const user=await userModel.findOne({//find the user in the collection based on either username or email entered
            $or:[{username},{email}]
        })
        if(!user)
        {
            return res.status(404).json({
                message:"Account not found"
            })
        }
        if(user.role!=='buyer')
        {
            return res.status(403).json({
                message:"Not buyer account"
            })
        }
        const validPassword=await bcrypt.compare(password,user.password);

        if(!validPassword)
        {
            return res.status(401).json({
                message: "Invalid password"
            })
        }

        const token=jwt.sign({
            id:user._id,// store the _id of the user found in collection on the basis of username or email
            role:user.role
        },process.env.JWT_SECRET);

        res.cookie('token',token);

        res.status(200).json({
            message: "Buyer logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                role:user.role
            }
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "internal server error"
        });
    }
}
async function SellerSignup(req, res) {
    try{
        const { username, email, password } = req.body;
        if(!username||!email||!password){
            return res.status(400).json({
                message:"bad request"
            })
        }
        const userExists=await userModel.findOne({
            $or:[{username},{email}]
        })
        if(userExists)
        {
            return res.status(409).json({
                message:"Seller already exists"
            })
        }
        let profileImage="";
        if(req.file){
            const result = await uploadFile(req.file.buffer.toString('base64'))
            profileImage = result.url;
        }
        const hash=await bcrypt.hash(password,10);
        const user = await userModel.create({
            username: username,
            email: email,
            password: hash,
            profileImage: profileImage,
            role: "seller"
        })
        const token = jwt.sign({
            id: user._id,//Identifies which user this token belongs to
            role: user.role//Stores their role("buyer","seller") for authorization checks
                }, process.env.JWT_SECRET)

        res.cookie("token", token);

        res.status(201).json({
            message: "seller signup successfull",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                role: user.role
            }
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"internal server error"
        })
    }
}
async function SellerLogin(req, res) {
    try {
        const { username, email, password } = req.body;
        if ((!username && !email) || !password) {
            return res.status(400).json({
                message: "bad request"
            })
        }
        const user = await userModel.findOne({
            $or: [{ username }, { email }]
        })
        if (!user) {
            return res.status(404).json({
                message: "Account not found"
            })
        }
        if (user.role !== 'seller') {
            return res.status(403).json({
                message: "Not Seller account"
            })
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }
        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET);

        res.cookie('token', token);

        res.status(200).json({
            message: "Seller logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                role: user.role
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "internal server error"
        });
    }
}
async function getCurrentUser(req,res) {
    return res.status(200).json({
        user:req.user,
    })
}
async function logout(req,res) {
    try{
        res.clearCookie('token');// The browser receives that response and removes the cookie from its own storage.
        res.status(200).json({
            message:"user logged out successfully"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"internal server error"
        })
    }
}
module.exports={BuyerSignup,BuyerLogin,SellerLogin,SellerSignup,getCurrentUser,logout};