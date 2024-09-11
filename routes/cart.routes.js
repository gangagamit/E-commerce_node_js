const express =  require('express');
const cartRoutes = express.Router();

const {
    addtoCart,
    getAllCarts,
    updateCart,
    deleteToCart
} 
=require('../controller/cart.controller');

const {VerifyToken, verifyToken} = require('../helpers/tokenVerify');

cartRoutes.post('/addtoCart',verifyToken,addtoCart);
cartRoutes.get('/',getAllCarts);
cartRoutes.put('/upadate-cart',verifyToken,updateCart)
cartRoutes.delete('/delete-carts',deleteToCart)

module.exports= cartRoutes;