import createHttpClient from "./http/httpClient";
import { API_BASE_URL } from "../../config/apiConfig";
import { AuthInterface } from "../../domain/entities/Auth";



const httpClient= createHttpClient(API_BASE_URL);


export const AuthApi={
    login: async (data: AuthInterface): Promise<AuthInterface>=>{
        const response= await httpClient.post('/api/v1/Auth', data);
        return response.data;
    }
}