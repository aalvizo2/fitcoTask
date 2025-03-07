import { notification } from "antd";
import { API_BASE_URL } from "../../config/apiConfig";
import { editTask, getTasks, newTask } from "../../domain/entities/Task";
import createHttpClient from "./http/httpClient";





const httpClient= createHttpClient(API_BASE_URL);


export const TaskApi={
    getTaskByUser: async (username: string, page: number): Promise<getTasks[]> => {
        const response = await httpClient.get(`/api/v1/Task/${username}/${page}`);
        return response.data.Data;
    },

    newTask: async(newData: newTask): Promise<newTask>=> {
         const response=  await httpClient.post('/api/v1/Task', newData);
         console.log(response)
         if(response.status === 200){
            notification.success(response.data.Message);
         }else{
            notification.info(response.data.Message);
         }

         return response.data;
    },

    editTask: async(newData: editTask): Promise<editTask> => {
        const response= await httpClient.put(`/api/v1/Task/${newData.id}`, newData);
        console.log(response)
        if(response.status === 200){
            notification.success(response.data.Message);
         }else{
            notification.info(response.data.Message);
         }
        return response.data;
    },

    deleteTask: async(id: string): Promise<void> => {
        const response= await httpClient.delete(`/api/v1/Task/${id}`);
        return response.data;
    }
    
}