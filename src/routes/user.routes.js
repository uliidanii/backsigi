import { Router } from "express";
import { methods as userController } from "../controllers/user.controller";

const router=Router();

router.get("/",userController.getusers);
router.get("/:id",userController.getuser);
router.post("/",userController.adduser);
router.put("/",userController.updateuser);
router.delete("/",userController.deleteuser);

export default router;