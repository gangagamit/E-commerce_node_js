 const User = require('../model/user.model');
const UserServices = require('../services/user.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userServices = new UserServices();

//GetAllUser

exports.getAllUser = async (req,res)=>{
    let user = await userServices.allUser({isDelete:false});
    res.json(user);
    
}
//Registration
exports.registerUser = async (req,res)=>{
   try {
    let imagepath ="";
    let user = await userServices.getUser({email:req.body.email,isDelete:false});
    if(user){
        return res.status(400).json({message:"user already exist"})
    }
    if(req.file){
        console.log(req.file.path);
        imagepath = req.file.path.replace(/\\/g,"/");
    }
    let hasPassword = await bcrypt.hash(req.body.password,10);
    console.log(hasPassword);
    user = await User.create({...req.body,password: hasPassword,profileImage:imagepath});    
    user.save();
    res.status(201).json({user,message:'User Registration successfully'})
   } catch (error) {
    console.log(error);
    res.status(500).json({message:'Internal server Error'});
   }
};
//Login
exports.loginUser = async (req,res)=>{
    try {
        let user = await userServices.getUser({email:req.body.email,isDelete:false});
        if(!user){
            return res.status(404).json({message:'user not found'});
        }
        let matchpassword = await bcrypt.compare(req.body.password,user.password);
        console.log(matchpassword);
        if(!matchpassword){
            return res.status(404).json({message:'email and password invalid'});
        }
        let token = await jwt.sign({userId:user._id},process.env.JWT_SECRET);
        res.status(200).json({message:'user login success',token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server Error'})
    }
};
//userProfile

exports.userProfile = async (req,res) =>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'internav server error'});
    }
};

//upadateuser

exports.updateUser = async (req,res)=>{
    try {
        let user = req.user;
        user = await userServices.updateuser(
            user._id,
            {$set:req.body},
            {new:true}
        );
        res.status(202).json({user,message:'user update successfull'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server Error'});
    }
};

//Delete

exports.deleteUser = async (req,res) =>{
    try {
        let user =  req.user;
        user = await userServices.deleteuser(
            user._id,
            {isDelete:true}
        );
        res.status(202).json({user,message:'user delete successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server error'})
    }
};

//confirm password

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const user = await User.findById(req.user._id);
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New password and confirm password is not match" });
        }
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = newHashedPassword;
        user.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};