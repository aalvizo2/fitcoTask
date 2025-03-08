import { newUser } from "../../domain/entities/User";
import { UserRepositoryImpl } from "../../domain/repositories/UserRepositoryImpl";





export class UserUseCases{
    constructor(private userRepository: UserRepositoryImpl){}

    async newUser(newData: newUser): Promise<newUser>{
        return this.userRepository.newUser(newData);
    }
}