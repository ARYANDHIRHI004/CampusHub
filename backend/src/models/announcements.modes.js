import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({

    announcementBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    assouncementTitle:{
        type:String,
        required:true,
    },
    assouncementDesc:{
        type:String,
        required:true
    },
    assouncementDate:{
        type: Date,
    }

},{timestamps:true})

export const Announcement = mongoose.model("Announcement", announcementSchema)