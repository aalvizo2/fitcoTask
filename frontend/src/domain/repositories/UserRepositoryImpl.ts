import { UserApi } from "../../adapters/api/UserApi";
import { newUser } from "../entities/User";




export class UserRepositoryImpl{
    async newUser(newData: newUser): Promise<newUser>{
        return UserApi.newUser(newData);
    }
}