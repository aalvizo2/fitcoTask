import { taskController } from "../controllers/taskController.js";
import express from 'express'; 


const router= express.Router();

router.get("/", taskController.getAllTasks);
router.post("/", taskController.newTask)



export default router;