import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.get("/user-list", new UserController().userList);

export default router;
