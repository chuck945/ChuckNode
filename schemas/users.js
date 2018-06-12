var mongoose=require('mongoose');
//定义用户信息表结构

module.exports=new mongoose.Schema({
    //用户名
    username:String,
    //密码
    password:String,

    isAdmin:{
        type:Boolean,
        default:false
    }
    
});

