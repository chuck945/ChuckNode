var express=require('express');
var router=express.Router();
router.get('/',function(req,res,next){
    res.render('main/index',{userInfo:req.userInfo});
})
router.get('/single',function(req,res,next){
    console.log(req.userInfo)
    res.render('main/single',{userInfo:req.userInfo});
})
module.exports=router;