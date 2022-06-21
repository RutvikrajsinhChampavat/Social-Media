import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();

router.get("/user-list", new UserController().userList);

export default router;
