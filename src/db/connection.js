const mongoose = require("mongoose")
const mongoDB ='mongodb://127.0.0.1:27017/Registration'

// const URI = process.env.MONGODB_URL;

mongoose.connect(mongoDB, {
//    useCreateIndex: true, 
//    useFindAndModify: false, 
//    useNewUrlParser: true, 
  // useUnifiedTopology: true 
}).then(()=>{
    console.log("connection is successfull...")
}).catch((e)=>{console.log(e)} );