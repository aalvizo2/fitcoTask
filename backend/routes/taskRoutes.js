import { taskController } from "../controllers/taskController.js";
import express from 'express'; 


const router= express.Router();

router.get("/:username/:page", taskController.getAllTasks);
router.post("/", taskController.newTask);
router.put("/:id", taskController.editTask);
router.delete("/:id", taskController.deleteTask);



export default router;