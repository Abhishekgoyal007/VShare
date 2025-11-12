import mongoose from "mongoose";

const Connection = ()=>{
    const url = "mongodb+srv://abhishekgoyal1311_db_user:tqe7UV7tSk2BzYes@filesharingapp.nyakjld.mongodb.net/";

    mongoose.connect(url).then(()=>{
        console.log("Database connected successfully");
    }).catch((err)=>{
        console.log("Error while connecting to the database ", err);
    });
}

export default Connection;