import { Transaction } from "../models/transaction.model.js";

export const postNewTransaction=async(req,res)=>{
    try{
      const { name,amount,category,description,date,reference}=req.body;
      if([name,amount,category,description,date].some((field)=>(field?.toString().trim()===""))){
        return res.status(400).json({message:'Some of the required fields are empty'});
      }
      if(isNaN(amount) ||Number(amount)<=0){
          return res.status(400).json({message:'Please enter a valid amount'});
      }
      if(description.length>250){
          return res.status(400).json({message:'Description is too long !!Max 250 charecters'});
      }
    const sanitizedDescription=description.trim();

    const newTransaction=await Transaction.create({
        name:name,
        amount:Number(amount),
        category:category.trim(),
        description:sanitizedDescription,
        date:date,
        reference:reference?reference:'',
        userId:req.user._id, //We link it with the logged in user
    });
    if(!newTransaction){
        return res.status(400).json({error:"Error in adding expense"});
    }
  
        return res.status(200).json({message:"Expense added successfully",transaction:newTransaction});
   

    }catch(error){
        console.log(error);
        return res.status(500).json({message:'Error in adding new expense'});
    }


}
export const getAllTransaction=async(req,res)=>{
    try{
    const transactions=await Transaction.find({userId:req.user._id});
    return res.status(200).json(transactions);
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Error getting transactions"});

    }

}
export const deleteTransaction=async(req,res)=>{
    try{
        const {id}=req.params;
        console.log("🧾 Route param id:", req.params.id);
       const transaction = await Transaction.findOneAndDelete({
        _id: id,
        userId: req.user._id,
       });
        if(!transaction){
            return res.status(400).json({message:"Transaction not found"});
        }
        return res.status(200).json({message:"User deleted successfully"});
    
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Some error occured while tring to delete"})

    }

}
