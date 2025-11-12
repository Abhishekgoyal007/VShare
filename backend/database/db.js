import mongoose from "mongoose";

const Connection = ()=>{
    const url = process.env.DATABASE_URL;

    mongoose.connect(url).then(()=>{
        console.log("Database connected successfully");
    }).catch((err)=>{
        console.log("Error while connecting to the database ", err);
    });
}

export default Connection;