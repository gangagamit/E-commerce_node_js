const User = require('../model/user.model');
class UserServices {
    async allUser(body){
        return await User.find(body)
    };
    async getUser(body){
        return await User.findOne(body);
    };

    async createUser(body){
        return await User.create(body);
    };
    // async matchPassword(body){
    //     return await User.compare(body)
    // }
    async updateuser(body,userId){
        return await User.findByIdAndUpdate(body,userId);
    };
    async deleteuser(userId, body){
        return await User.findByIdAndUpdate(userId,body ,{new: true});
    }
};

module.exports = UserServices;