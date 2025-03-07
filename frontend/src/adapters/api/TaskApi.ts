import { API_BASE_URL } from "../../config/apiConfig";
import { getTasks } from "../../domain/entities/Task";
import createHttpClient from "./http/httpClient";





const httpClient= createHttpClient(API_BASE_URL);


export const TaskApi={
    getTaskByUser: async (username: string, page: number): Promise<getTasks[]> => {
        const response = await httpClient.get(`/api/v1/Task/${username}/${page}`);
        return response.data.Data;
    }
    
}