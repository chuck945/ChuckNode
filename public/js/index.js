
function register(){
    $.post("/api/user/register",{username:'qiankunzhang ', password:'12345678'},function(result){

        alert(result.msg)
    })
}



function login(){

    $.post("/api/user/login",{username:$("#username").val(), password:$("#password").val()},function(result){

        alert(result.msg)
    })
    return false;
}