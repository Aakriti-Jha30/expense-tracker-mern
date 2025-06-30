import mongoose from "mongoose";

const TransactionSchema= new mongoose.Schema({
    name:{

        type:String,
        required:[true,'Please enter the name'],
    },
    amount:{
        type:Number,
        required:[true,'Please enter the amount'],
    },
    category:{
        type:String,
        required:[true,'Please enter the category'],
    },
    description:{
        type:String,
        required:[true,'Please enter the description of spending'],
    },date:{
        type:Date,
        required:[true,'Date is required'],
        default: Date.now,
    },
    reference:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }

},{timestamps:true});

export const Transaction=mongoose.model('Transaction',TransactionSchema);