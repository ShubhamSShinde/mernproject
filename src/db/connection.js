const mongoose = require("mongoose")
const mongoDB ='mongodb://127.0.0.1:27017/Registration'
const DB =`mongodb+srv://shubham6678:${process.env.PASSWORD}@cluster0.dmg8bej.mongodb.net/mernstack?retryWrites=true&w=majority`

// const URI = process.env.MONGODB_URL;

mongoose.connect(DB, {
//    useCreateIndex: true, 
//    useFindAndModify: false, 
//    useNewUrlParser: true, 
  // useUnifiedTopology: true 
}).then(()=>{
    console.log("connection is successfull...")
}).catch((e)=>{console.log(e)} );