const Product = require('../model/product.model');

class ProductServices {
    async addNewProduct(body){
        return await Product.create(body);
    };
    async getProduct(body){
        return await Product.findOne(body);
    };
};
module.exports = ProductServices;