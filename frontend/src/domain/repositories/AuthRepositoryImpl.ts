import { AuthApi } from "../../adapters/api/AuthApi";
import { AuthInterface } from "../entities/Auth";


export class AuthRepositoryImpl{
    async login(data: AuthInterface): Promise<AuthInterface>{
        return AuthApi.login(data);
    }
}