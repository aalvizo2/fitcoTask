import { TaskApi } from "../../adapters/api/TaskApi";
import { editTask, getTasks, newTask } from "../entities/Task";



export class TaskRepositoryImpl{
    async getTasks(username: string, page: number): Promise<getTasks[]>{
        return TaskApi.getTaskByUser(username, page);
    }

    async newTask(data: newTask): Promise<newTask>{
        return TaskApi.newTask(data);
    }

    async editTask(newData: editTask): Promise<editTask>{
        return TaskApi.editTask(newData);
    }
    
    async deleteTask(id: string): Promise<void>{
        return TaskApi.deleteTask(id);
    }
}