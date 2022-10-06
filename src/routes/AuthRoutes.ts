import * as Joi from '@hapi/joi'
import {userExists,validator,isAuthenticated} from "../middlewares";
import {createValidator} from 'express-joi-validation'
import { Router } from "express";
import AuthController from "../controllers/AuthController";
const router = Router();
const userRegisterBodySchema = Joi.object().keys({
    userName:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required()
})
const userLoginBodySchema = Joi.object().keys({
    password:Joi.string().required(),
    email:Joi.string().required()
})
router.post("/register",validator(userRegisterBodySchema),userExists, new AuthController().register);
router.post("/login",validator(userLoginBodySchema), new AuthController().login);
router.get('/welcome',isAuthenticated,new AuthController().welcome)
export default router;
