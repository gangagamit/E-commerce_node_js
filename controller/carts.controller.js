const Cart = require('../model/carts.model');

exports.addtoCart = async (req,res) =>{
    try {
        let userId = req.user_id;
        let cart = await Cart.findOne({
            user:userId,
            productId:req.body.productId,
            isDelete:false,
        });
        if(cart){
            return res.json({message:'Already exist..'})
        }
        cart = await Cart.create({user:userId,...req.body});
        res.status(201).json({massge:'cart added',cart});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'server error'});
    }
};

exports.getAllCarts = async (req,res) =>{
    let carts = await Cart.find({user: req.user_id,isDelete:false});
    res.json(carts);
}


exports.updateCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({
            userId: req.user._id,
            productId: req.body.productId,
            isDeleted: false
        });
        if (!cart) {
            return res.status(404).json({ message: "cart Not Found Can't update..." });
        }
        cart = await Cart.findByIdAndUpdate(cart._id, { $set: { quantity: req.body.quantity } }, { new: true });
        res.status(200).json({ message: 'cart Update SussesFully...', updated: req.body.quantity });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteToCart = async (req,res) => {
    try {
      let cart = await Cart.findOne({_id: req.body._id , isDelete : false});
      cart = await Cart.findByIdAndUpdate(cart._id,{$set : {isDelete : true }} , {new : true});
      res.status(200).json({message : 'Product Was Deleted....',cart});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}