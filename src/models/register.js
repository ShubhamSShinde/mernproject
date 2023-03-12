const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// register schema 

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        unique: true,
        unique: [true, "email id is already present"],
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error("invalid email")
            }
        }
    },
    
    password:{
        type:String,
        required: true,
        // min: 10,
        // max: 10,
     
    },
    
    confirm_password:{
        type:String,
        required: true,
        // min: 10,
        // max: 10,
     
    },
    tokens:[{
        token:{
            type:String,
            required: true,
        }
    }]

})

// gerntate tokens 
registerSchema.methods.generateAuthToken = async =async function(){
try {
   
    const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY)
    this.tokens  = this.tokens.concat({token:token})
    await this.save()
    // console.log(token)
    return token;
} catch (error) {
    res.send(error)
    console.log(error)
}
}

registerSchema.pre("save", async function(next){
    if(this.isModified("password")){
    // console.log(this.password)
    this.password = await bcrypt.hash(this.password,10);
    this. confirm_password = await bcrypt.hash(this. confirm_password,10);
    // console.log(this.password)
    // this.confirm_password = undefined;
    }
// const passwordHash =  await bcrypt.hash(password,10);

next();

})

// creating a new collection

const Register= new mongoose.model('Register',registerSchema);

module.exports = Register;