const whishlist = require('../model/wishlist.model');
const whishlistServices = require('../services/whishlist.service');
const whishListservice = new whishlistServices();
exports.addwhishList = async (req,res)=>{
    try {
        let userId = req.user._id;
        let whishList = await whishListservice.getwhishlist({user : userId, 
            productId : req.body.productId,
            isDelete : false});
        if(whishList){
            return res.json({message : "Already Exists..."})
        }
        whishList = await whishListservice.addWhishlist({user : userId , ...req.body});
        res.status(201).json({message : "WhishList Added Success", whishList})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
};
