var express=require('express');
var router=express.Router();
var user=require('../moudels/user')
var request=require('request');

var responseData;
router.use(function(req,res,next){
    responseData={code:0,msg:''}
      next();
})

router.post('/user/register',function(req,res,next){
    //res.render('admin/user/index');
    console.log(req.body)
    var userName=req.body.username;
    var password=req.body.password;

    user.findOne({username:userName}).then(function(userInfo){
        console.log(userInfo)
        if(userInfo){
            console.log('注册用户名已存在')
            responseData.code=1;
            responseData.msg='注册用户名已存在'
            res.json(responseData);
            return;
        }
            console.log('用户名可以使用')

            var usernew=new user({ username:userName,password:password })
            return usernew.save();

    }).then(function(newUserInfo){
        console.log(newUserInfo)
        responseData.code=0;
        responseData.msg='注册成功'
        res.json(responseData);

    })


})
/*

router.post('/user/login',function(req,res,next) {
console.log(req.body)
    request({
            url: 'http://localhost:54465/Mobile/QueryValidCodeAsync',
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: {mobileNumber:req.body.username,mobileValidType:req.body.password}
        }, function(error, response, body) {
        console.log(error)
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        })

})
*/


router.post('/user/login',function(req,res,next){
    var userName=req.body.username;
    var password=req.body.password;

    user.findOne({username:userName}).then(function(userInfo){
        if(!userInfo){
            console.log('用户不存在')
            responseData.code=1;
            responseData.msg='用户不存在'
            res.json(responseData);
            return;
        }

       if( userInfo.password!=password){
           console.log('密码错误')
           responseData.code=1;
           responseData.msg='密码错误'
           res.json(responseData);
           return;
       }

        console.log('登录成功')
        responseData.code=0;
        responseData.msg='登录成功'
        req.cookies.set('userinfo',JSON.stringify({id:userInfo._id,name:userInfo.username}));

        res.json(responseData);

    })

});

module.exports=router;