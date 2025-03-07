import React, { useEffect, useState } from "react";
import { TaskRepositoryImpl } from "../../../domain/repositories/TaskRepositoryImpl";
import { TaskUseCases } from "../../../core/useCases/TaskUseCases";
import { getTasks } from "../../../domain/entities/Task";
import { jwtDecode } from "jwt-decode";



const taskRepository = new TaskRepositoryImpl();
const taskUseCases = new TaskUseCases(taskRepository);


const Dashboard: React.FC = () => {
    const [data, setData] = useState<getTasks[]>([]);
    const [username, setUsername] = useState('');


    const fetchUsername = () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                console.log('token decodificado', decodedToken)
                setUsername(decodedToken.Username || "Usuario");

            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }

    }




    const fetchData = async() => {
        try{
            

            const response= await taskUseCases.getTasks(username, 1);
            setData(response);

        }catch(error){
            console.error('Error al cargar los datos', error)
        }
    };


    useEffect(() => {
        fetchData();
        fetchUsername();
    })
    return (
        <>

            <div
                style={{
                    marginTop: 50,
                    padding: 25
                }}

            >
                <h1>Mis tareas</h1>
            </div>
            <div>
                {data.map((item) => (
                    <div key={item.id}>
                        {item.titulo}
                        {item.description}
                        {item.duedate}

                    </div>
                ))}
            </div>
        </>
    )
};


export default Dashboard;