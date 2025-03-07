import AuthController from "../controllers/AuthController.js";
import express from 'express';



const router= express.Router();


router.post("/", AuthController.login);


export default router;