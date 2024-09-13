const express = require('express');
const whishlistRoutes = express.Router();

const {addwhishList} = require('../controller/whishlist.controller');
const {verifyToken} = require('../helpers/tokenVerify');

whishlistRoutes.post('/addwhislist',verifyToken,addwhishList);

module.exports = whishlistRoutes;