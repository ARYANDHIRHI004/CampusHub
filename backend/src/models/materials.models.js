import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
    course:{
        type:mongoose.Types.ObjectId,
        ref:"Course"
    },
    material:{
        type:String,
    }
},{timestamps:true})

export const Material = mongoose.model("Material", materialSchema)