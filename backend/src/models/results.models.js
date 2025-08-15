import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    ResultBelongsTo:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    result:{
        type:String,
        required:true
    }

},{timestamps: true})

export const Result = mongoose.model("Result", resultSchema)