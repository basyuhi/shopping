function verifyBuyer(req,res,next){
    if (req.user.role !== "buyer") {
        return res.status(403).json({
            message: "Access denied. Buyer account required."
        });
    }
    next();
}
module.exports=verifyBuyer;