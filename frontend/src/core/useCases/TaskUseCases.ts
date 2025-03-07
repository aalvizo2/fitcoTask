import { editTask, getTasks, newTask } from "../../domain/entities/Task";
import { TaskRepositoryImpl } from "../../domain/repositories/TaskRepositoryImpl";



export class TaskUseCases{
    constructor(private taskRepository: TaskRepositoryImpl){}


    async getTasks(username: string, page: number): Promise<getTasks[]>{
        return this.taskRepository.getTasks(username, page)
    }

    async newTask(newData: newTask): Promise<newTask>{
        return this.taskRepository.newTask(newData)
    }
    
    async editTask(newData: editTask): Promise<editTask>{
        return this.taskRepository.editTask(newData);
    }

    async deleteTask(id: string): Promise<void>{
        return this.taskRepository.deleteTask(id);
    }
}