
//应用程序的启动（入口）文件


var express=require("express");//加载express模块
var swig =require("swig"); //加载模板处理模块
var mongoose=require('mongoose');// 加载mongoose数据库
var bodyParser=require('body-parser');//处理post请求参数的中间件
var cookies=require('cookies'); //加载cookies模块

var app=express();//创建App应用 =》NodeJs Http.createServer();

//定义模板引擎
app.engine('html',swig.renderFile);

//设置模板文件目录，第一个参数必须是views，第二个参数是模板文件目录路径
app.set('views','./views');

//注册使用的模板引擎，第一个参数必须为 view engine，第二个参数与app.engine定义模板引擎方法中的第一个参数一致
app.set('view engine', 'html');


//配置处理post请求参数的中间件，注意：必须配置在路由之前
app.use(bodyParser.urlencoded({extended:true}));

//配置处理cookies参数的中间件，注意：必须配置在路由之前
app.use(function (req,res,next) {
    req.cookies=new cookies(req,res);
    //记录登录的cookies信息
    req.userInfo={};
    if(req.cookies.get('userinfo')){
        try{
            req.userInfo=JSON.parse(req.cookies.get('userinfo'));
        }catch(e){}
    }

    next();
});

app.use('/public',express.static(__dirname+'/public'));// 静态文件，当用户访问Url以public开始，那么就直接返回 __dirname+'/public'下面对应的文件


app.use('/admin',require('./routers/admin'));
app.use('/main',require('./routers/main'));
app.use('/api',require('./routers/api'));

swig.setDefaults({cache:false});//在开发中取消模板缓存，上线之后再启用

//首页
app.get('/',function(req,res,next){
    res.render('index');
})

//连接mongodb数据库
mongoose.connect('mongodb://localhost/NodeJsWeb',function(err){
    if(err){
        console.log('连接数据库失败')
    }else{
        console.log('数据库连接成功')
        app.listen(8081); //监听端口
    }
});





