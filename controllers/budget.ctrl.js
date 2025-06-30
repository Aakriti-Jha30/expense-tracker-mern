import { Budget } from "../models/budget.model.js";
export const setUserBudget = async (req, res) => {
  const { budget } = req.body;
  if (isNaN(budget) || budget < 0) {
    return res.status(400).json({ message: "Invalid budget value" });
  }

  const updatedBudget = await Budget.findOneAndUpdate(
    { userId: req.user._id },
    { budget },
    { new: true, upsert: true } // Create if not exists
  );

  res.status(200).json({ message: "Budget saved", budget: updatedBudget });
};

// Get Budget
export const getUserBudget = async (req, res) => {
  const userBudget = await Budget.findOne({ userId: req.user._id });
  res.status(200).json(userBudget);
};
