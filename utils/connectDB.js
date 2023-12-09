import mongoose from "mongoose";

const uri = process.env.MONGO_URL;
async function connectDB(){
    if(mongoose.connections[0].readyState) return;
    mongoose.connect(uri);
    console.log("Connect DB");
}

export default connectDB;