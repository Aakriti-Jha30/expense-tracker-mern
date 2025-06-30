import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { postNewTransaction,getAllTransaction } from "../controllers/transaction.ctrl.js";
import { deleteTransaction } from "../controllers/transaction.ctrl.js";
const router=Router();

router.route('/getTransactions').get(verifyJWT,getAllTransaction);
router.route('/postNewTransactions').post(verifyJWT,postNewTransaction);
router.route('/deleteTransaction/:id').delete(verifyJWT,deleteTransaction);

export default router; 