import { Router } from "express";
import { methods as loanController} from "../controllers/loan.controller";
import verifyToken from '../auth';

const router = Router();

// router.get("/",verifyToken,loanController.getloans);
router.get("/",loanController.getloans);
router.get("/:id",loanController.getloan);
router.post("/",loanController.addloan);

export default router;