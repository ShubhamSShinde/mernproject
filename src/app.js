require("dotenv").config();
const express =  require("express");
const app = express();
const path = require("path")
require("./db/connection");
const hbs = require('hbs')
const Register = require("./models/register")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const port  = process.env.PORT || 8000

const static_path =path.join(__dirname, '../public')
const templets_path =path.join(__dirname,"../templets/views")
const partials_path =path.join(__dirname, '../templets/partials')

// app.use( express.static(path.join(__dirname, '../public')))



app.use(express.json());
app.use(express.urlencoded({extended:false})); ///whatever data is presnt on form section we will get 
app.use(express.static('public'))  ;
// if you have static html page in public folder it will show 



app.set('view engine', 'hbs');
app.set("views",templets_path)
hbs.registerPartials(partials_path) 

app.get("/",(req,res)=>{
res.render("index") // render means showing the page
})

app.get("/register",(req,res)=>{
res.render("register")
});

// create new user in database
app.post("/register",async(req,res)=>{
try {
const password = req.body.password
const cpassword = req.body.cpassword

if(password === cpassword){
const user = new Register({
    name: req.body.name,
    email: req.body.email,
    password:req.body.password,
    confirm_password:req.body.cpassword
});

// middleware 
const token = await user.generateAuthToken()



const create_user =  await user.save();
     res.render("index");

}
else{
    res.send("password does not match")
}


    
} catch (error) {
    res.status(400).send(error)
}
});


app.get("/login",(req,res)=>{
res.render("login")
})

app.post("/login",async(req,res)=>{
try {
    const email = req.body.email
    const password = req.body.password

   const user_email = await Register.findOne({email:email});

   const isMatch = await bcrypt.compare(password,user_email.password)
   const token = await user_email.generateAuthToken(); 
   if(isMatch){
    res.render("index");
   }

   else{
    res.send("Invalid login credentials")
   }

} catch (error) {
    res.status(400).send("pls enter invalid credentials...")

}
})

app.listen(port ,()=>{
console.log(`listening on port: ${port}`)
})