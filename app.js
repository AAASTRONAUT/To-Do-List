const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

var tasks = [];
var fullDate = new Date();
var date = fullDate.getDate();
var day = fullDate.toLocaleDateString('default' ,{weekday:'long'} );
var month = fullDate.toLocaleString('default' , {month : 'long'});
var dateString = day + ", " + month +" "+date;

var workList = [];
app.get("/" , function(req , res){
    res.render('list', {newElements: tasks , header: dateString , type:"normal"});
})

app.get("/work" , function(req , res){
    res.render('list' , {newElements: workList , header:"Work" , type:"work"});
})

app.get("/about" , function(req , res){
    res.render('about');
})

app.post("/" , function(req , res){
    if (req.body.submit == "normal"){
        tasks.push(req.body.newTask);
        res.redirect("/");
    }
    else if(req.body.submit == "work"){
        workList.push(req.body.newTask);
        res.redirect("/work");
    }
 
});

app.listen(3000 , function(){
    console.log("server is running at port 3000");
})