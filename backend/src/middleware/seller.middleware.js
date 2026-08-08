function verifySeller(req, res, next) {
    if (req.user.role !== "seller") {
        return res.status(403).json({
            message: "Access denied. Seller account required."
        });
    }
    next();
}

module.exports = verifySeller;