const express=require('express');
const app=express();
//routing and middleware
app.use(function(req,res,next){
    console.log("hanjiiiiiii");
    next();
});
app.get("/",function(req,res){
    res.send("hello sukhi");
})
app.get("/profile",function(req,res){
    res.send("joo")
})
app.listen(3000);
//cookies and sessions
app.use(express.json());
app.use(express.urlencoded({extended : true}));
