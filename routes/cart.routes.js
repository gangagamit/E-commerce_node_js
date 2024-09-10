const express =  require('express');
const cartRoutes = express.Router();

const {
    addtoCart,
    getAllCarts,
    updateCart,
    deleteToCart
} 
=require('../controller/cart.controller');

const {VerifyToken} = require('../helpers/tokenVerify');

cartRoutes.post('/',VerifyToken,addtoCart);
cartRoutes.get('/',getAllCarts);
cartRoutes.put('/update-carts',VerifyToken,updateCart);
cartRoutes.delete('/delete-carts',deleteToCart)

module.exports= cartRoutes;