var express=require('express');
var router=express.Router();
router.get('/user',function(req,res,next){
    res.render('admin/user/index');
})

module.exports=router;