const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const https = require('https');
app.use(express.static("assests"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/signup.html')
})

app.post('/',function(req,res){
    console.log(req.body);
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    const data ={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME : fname,
                    LNAME : lname
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/eb56906423"
    const options={
        method:"POST",
        auth :"manish:9dd07c819085ad6ded3f217306532e8a-us21"

    }
    const request = https.request(url ,options ,function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");

        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();
})

app.post('/failure' , function(req,res){
    res.redirect('/');
})
app.listen(8000, function(){
    console.log("Server Running on Port: 8000");
})

