import { API_BASE_URL } from "../../config/apiConfig";
import { newUser } from "../../domain/entities/User";
import createHttpClient from "./http/httpClient";



const httpClient= createHttpClient(API_BASE_URL);


export const UserApi={
    newUser: async(newData: newUser): Promise<newUser>=>{
        const response= await httpClient.post('/api/v1/User', newData);
        return response.data;
    }
}