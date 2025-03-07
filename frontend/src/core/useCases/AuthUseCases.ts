import { AuthInterface } from "../../domain/entities/Auth";
import { AuthRepositoryImpl } from "../../domain/repositories/AuthRepositoryImpl";





export class AuthUseCases{
    constructor(private authRepository: AuthRepositoryImpl){}
    async login(data: AuthInterface): Promise<AuthInterface>{
        return this.authRepository.login(data)
    }
}