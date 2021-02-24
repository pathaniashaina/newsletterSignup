require('dotenv').config();
const express=require("express");
const request=require("request");
const https=require("https");
const app=express();


// to use static files we must use this
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const fname=req.body.fname;
  const lname=req.body.lname;
  const email=req.body.email;
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname,
        }
      }
    ]
  };
const jsonData=JSON.stringify(data);

const options={
  method:"POST",
  auth:process.env.APP_KEY,
}

const request=https.request(process.env.APP_ID,options,function(response){
  if((response.statusCode)==200){
    res.sendFile(__dirname+"/success.html");
  }
  else{
      res.sendFile(__dirname+"/failure.html");
  }
  response.on("data",function(data){
    let jsonData=json.stringify(jsonData);
  });

});
request.write(jsonData);
request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
console.log("app is running successfully");
app.listen(port);
