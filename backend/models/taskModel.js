import connection from "../database/database.js";

export const taskModel = {
    getAllTasks: (username, limit, offset) => {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM tareas WHERE usuario = ? LIMIT ? OFFSET ?";

            connection.query(query, [username, limit, offset], (err, data) => {
                if (err) {
                    reject(err); // Rechazar la promesa si hay un error
                } else {
                    resolve(data); // Resolver la promesa con los datos
                }
            });
        });
    },

    createTask: (newData) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO tareas (titulo, descripcion, duedate, estatus, usuario) VALUES (?, ?, ?, ?, ?)';

            connection.query(query, [newData.titulo, newData.descripcion, newData.duedate, newData.estatus, newData.usuario], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result); // Resolver la promesa con el resultado de la inserción
                }
            });
        });
    }
};