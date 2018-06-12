var mongoose=require('mongoose');
var userSchema=require('../schemas/users');
//定义用户数据模型
module.exports=mongoose.model('User',userSchema)