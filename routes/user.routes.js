const express = require('express');

const userRoutes = express.Router();
const {registerUser,loginUser,userProfile,updateUser,deleteUser,getAllUser,changePassword} = require('../controller/user.controller');
const {upload} = require('../helpers/imageUpload');
const {verifyToken} = require('../helpers/tokenVerify');


userRoutes.post('/register',upload.single('profileImage'),registerUser);
userRoutes.post('/login',loginUser);
userRoutes.get('/userverify',verifyToken,userProfile);
userRoutes.put('/updateUser',verifyToken,updateUser);
userRoutes.delete('/delete',verifyToken,deleteUser);
userRoutes.get('/allUser',getAllUser);
userRoutes.put('/chagePassword',verifyToken,changePassword);
module.exports = userRoutes;