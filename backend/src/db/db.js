const mongo=require('mongoose');
async function connectDB() {
    try{
        await mongo.connect(process.env.MONGO_URI);
        console.log("database connected");
    }catch(err){
        console.log(err);
    }
}
module.exports=connectDB;