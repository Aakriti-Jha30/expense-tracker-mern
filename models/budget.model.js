import mongoose from "mongoose";
const BudgetSchema=new mongoose.Schema({
    budget:{
        type:Number,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }

},{timestamps:true})

export const Budget=mongoose.model('Budget',BudgetSchema);
