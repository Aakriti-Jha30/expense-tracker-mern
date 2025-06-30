import { Router } from "express";
import { setUserBudget } from "../controllers/budget.ctrl.js";
import { getUserBudget } from "../controllers/budget.ctrl.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router();

router.route('/setBudget').post(verifyJWT,setUserBudget);

router.route('/getBudget').get(verifyJWT,getUserBudget);

export default router;
 