import { TaskApi } from "../../adapters/api/TaskApi";
import { getTasks } from "../entities/Task";



export class TaskRepositoryImpl{
    async getTasks(username: string, page: number): Promise<getTasks[]>{
        return TaskApi.getTaskByUser(username, page);
    }
}