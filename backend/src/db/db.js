import mongoose from "mongoose";
import { environment } from "../utils/constenst.js";

const connectDB = async () => {
    try {
        const connectionnInstance = await mongoose.connect(`${environment.MONGODB_URI}/campusHub`)
        console.log("MongoDb connected successfully")
    } catch (error) {
        console.log("MongoDb connectionn failed")
        process.exit(1)
        
    }
}

export default connectDB
