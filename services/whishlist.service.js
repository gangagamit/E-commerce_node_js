const whishlist = require('../model/wishlist.model');

class whishlistServices {
    async getwhishlist(body){
        return await whishlist.findOne(body);
    };
    async addWhishlist(body){
        return await whishlist.create(body)
    }
}
module.exports = whishlistServices;