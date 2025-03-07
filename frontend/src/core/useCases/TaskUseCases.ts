import { getTasks } from "../../domain/entities/Task";
import { TaskRepositoryImpl } from "../../domain/repositories/TaskRepositoryImpl";



export class TaskUseCases{
    constructor(private taskRepository: TaskRepositoryImpl){}


    async getTasks(username: string, page: number): Promise<getTasks[]>{
        return this.taskRepository.getTasks(username, page)
    }
}