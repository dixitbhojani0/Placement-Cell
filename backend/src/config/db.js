// 1. Import MongoDB Client
import mongoose from "mongoose";

// 2. Function to connect to the database
export const connectToDB = async () => {
    try {
        console.log("db connecting...");
        const res = await mongoose.connect(process.env.mongoURI);
        console.log(`mongodb connected with server ${res.connection.host}`);
    } catch (err) {
        console.log("mongodb connection failed!");
        console.log(err);
    }
};