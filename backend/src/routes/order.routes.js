const express = require("express");
const { placeOrder, getBuyerOrders, getSellerOrders } = require('../controllers/order.controller');
const verifyUser = require('../middleware/auth.middleware');
const verifyBuyer = require('../middleware/buyer.middleware');
const verifySeller = require("../middleware/seller.middleware");

const router = express.Router();
router.post('/place', verifyUser, verifyBuyer, placeOrder);

router.get("/my-orders", verifyUser, verifyBuyer, getBuyerOrders);

router.get('/seller-orders', verifyUser, verifySeller, getSellerOrders);
module.exports = router;