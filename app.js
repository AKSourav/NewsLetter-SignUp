const express=require("express");
const path=require("path");
const bodyparser=require("body-parser");
const https=require("https");
const app=express();

app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"signup.html"));
});
app.post("/",(req,res)=>{
    const firstName=req.body.fname;
    const lastNname=req.body.lname;
    const email=req.body.email;
    console.log(email);
    
    var data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastNname
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const API_SERVER="us18";
    const apikey="416e672ef62cf30e6a7fdf1f5ac2e5b0-us18"
    const userName="anupdevil2001@gmail.com";
    const list_id="a76a76ddb7";
    const url=`https://${API_SERVER}.api.mailchimp.com/3.0/lists/${list_id}`
    const options={
        method: "POST",
        auth: `${userName}:${apikey}`
    }

    const request= https.request(url,options,function(response){
        if(response.statusCode==200)
            res.sendFile(path.join(__dirname,"success.html"));
        else
            res.sendFile(path.join(__dirname,"failure.html"));

        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT,3000,()=>console.log("Site running on port 3000"));

// API Key:
// 416e672ef62cf30e6a7fdf1f5ac2e5b0-us18

// List Id:
// a76a76ddb7