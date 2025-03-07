import React, { useEffect, useState } from "react";
import { TaskRepositoryImpl } from "../../../domain/repositories/TaskRepositoryImpl";
import { TaskUseCases } from "../../../core/useCases/TaskUseCases";
import { editTask, getTasks, newTask } from "../../../domain/entities/Task";
import './Dashboard.css'
import { AddModal, EditModal } from "./TaskModals";
import { jwtDecode } from "jwt-decode";

const taskRepository = new TaskRepositoryImpl();
const taskUseCases = new TaskUseCases(taskRepository);

const Dashboard: React.FC = () => {
    const [data, setData] = useState<getTasks[]>([]);
    const [username, setUsername] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [modal, setModal] = useState(false);
    const [datoFila, setDatoFila] = useState<string[] | null>(null);


    const handleAddModal = () => {
        setModal(true);
    };

    const handleOpenEditModal= (record: any) => {
        setDatoFila(record);
        setModal(true);
    }

    const fetchUsername = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Asegúrate de que el token sea válido y pueda ser decodificado
                const decodedToken: any = jwtDecode(token);
                console.log(decodedToken, 'token decodificado');
                setUsername(decodedToken.Username || "");
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        } else {
            console.error("Token no encontrado en el localStorage.");
        }
    };

    const fetchData = async (username: string) => {
        if (username) {
            try {
                const response = await taskUseCases.getTasks(username, currentPage);
                console.log(username, currentPage);
                setData(response);
            } catch (error) {
                console.error("Error al cargar los datos", error);
            }
        } else {
            console.error("No se ha encontrado el nombre de usuario.");
        }
    };

    useEffect(() => {
        fetchUsername(); // Primero obtener el username
    }, []);

    useEffect(() => {
        if (username) {
            fetchData(username);
        }
    }, [username, currentPage]); // Dependencia para cargar datos solo cuando se tenga el username

    const handlePageChange = (page: number) => {
        if (page > 0) {
            setCurrentPage(page);
        }
    };

    const handleAdd = async (values: newTask) => {
        const newData = {
            titulo: values.titulo,
            descripcion: values.descripcion,
            estatus: values.estatus,
            usuario: username

        };
        console.log('valores antes de enviar', newData)
        await taskUseCases.newTask(newData);
        fetchData(username);
    };

    const handleEditTask= async(newData: editTask)=>{
       try{
         console.log('valores a enviar', newData)
         await taskUseCases.editTask(newData);
         fetchData(username);
       }catch(error){

       }
    };

    const handleDeleteTask= async(id: string)=> {
        try{
            await taskUseCases.deleteTask(id);
            fetchData(username);

        }catch(error){
            console.error('error al eliminar', error)

        }
    }

    return (
        <>
            <div style={{ marginTop: 50, padding: 25, textAlign: 'center' }}>
                <h1>Mis Tareas</h1>
                <div>
                    <button className="btn" onClick={handleAddModal}>Agregar Tarea</button>
                </div>
            </div>
            <div className="task-container">
                {data.map((item) => (
                    <div key={item.id} className="task-item">
                        <h3 className="task-title">{item.titulo}</h3>
                        <p className="task-description">{item.descripcion}</p>
                        <span className="task-duedate">{item.duedate}</span>
                        <div className="task-actions">
                            <button
                                onClick={() => handleOpenEditModal(item)}
                                className="btn-edit"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDeleteTask(item.id)}
                                className="btn-delete"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    Anterior
                </button>
                <span className="page-number">{currentPage}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={data.length === 0}
                    className="pagination-button"
                >
                    Siguiente
                </button>
            </div>
            <AddModal
                open={modal}
                onCancel={() => setModal(false)}
                onSubmit={handleAdd}
            />

            <EditModal
                open={modal}
                onCancel={() => setModal(false)}
                datoFila={datoFila}
                onSubmit={handleEditTask}
            />
        </>
    );
};

export default Dashboard;
