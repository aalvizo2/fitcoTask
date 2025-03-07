import { taskModel } from "../models/taskModel.js";

export const taskController = {
    getAllTasks: async (req, res) => {
        try {
            
            const {username, page = 1 } = req.body; // page es opcional, por defecto es 1
            const limit = 30; // Número de registros por página

            // Validar que se proporcionó un nombre de usuario
            if (!username) {
                return res.status(400).json({ Message: "No se encontró ningún usuario registrado" });
            }

            // Calcular el offset
            const offset = (page - 1) * limit;

            // Obtener las tareas del usuario con paginación
            const tasks = await taskModel.getAllTasks(username, limit, offset);

            // Devolver las tareas en la respuesta
            res.status(200).json({ Data: tasks });
        } catch (error) {
            console.error("Error en getAllTasks:", error);
            res.status(500).json({ Message: "Hubo un error inesperado", error });
        }
    },

    newTask: async (req, res) => {
        try {
            // Verificar que el cuerpo de la solicitud tenga los datos correctos
            const { titulo, descripcion,  estatus, usuario } = req.body;

            const date= new Date();
            const duedate= date;

            console.log("Datos recibidos:", req.body); // Log para depuración

            // Validar que todos los campos requeridos estén presentes
            if (!titulo || !descripcion ||  estatus === undefined || !usuario) {
                return res.status(400).json({ Message: "Faltan datos requeridos" });
            }

            // Crear el objeto newData
            const newData = { titulo, descripcion, duedate, estatus, usuario };

            // Insertar la nueva tarea
            const response = await taskModel.createTask(newData);

            if (response) {
                res.status(200).json({ Message: 'Operación realizada con éxito' });
            }
        } catch (error) {
            console.error("Error en newTask:", error);
            res.status(500).json({ Message: 'Error al ingresar los datos', error });
        }
    },

    editTask: async(req, res) => {
        try{
            const {id}= req.params;
            const {titulo, descripcion, duedate, estatus}= req.body;
            const newData= {
                titulo, 
                descripcion,
                duedate, 
                estatus
            };


            const response= await taskModel.editTask(id, newData);

            if(response){
                res.status(200).send({Message: 'Operación realizada con éxito'});
            }

        }catch(error){
            res.status(500).send({Message: 'Hubo un error al ', error})
        }
    },

    deleteTask: async(req, res) => {
        try{
           const {id}= req.params;

           const response= await taskModel.deleteTask(id);

           if(response){
              res.status(200).send({Message: "Operación realizada con éxito"})
           }
        }catch(error){
            res.status(500).send({Message: 'Error al eliminar la tarea'});
        }
    }
};