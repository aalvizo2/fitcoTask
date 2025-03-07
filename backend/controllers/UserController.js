import bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel.js';

const UserController = {
    createUser: async (req, res) => {
        const { Name, Email, Password } = req.body;
        console.log(req.body, 'datos a ingresar');

        // Hashing the password
        try {

            const salt = await bcrypt.genSalt(10); 
            const hashedPassword = await bcrypt.hash(Password, salt); 

            const newData = { Name, Email, Password: hashedPassword }; 
            console.log(newData, 'datos ingresados');

            // Llamamos al modelo para insertar el usuario
            UserModel.createUsers(newData, (err, result) => {
                if (err) {
                    return res.status(500).json({ Message: 'Error al crear usuario', err });
                } else {
                    return res.status(200).json({ Message: 'Operación realizada con éxito' });
                }
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ Message: 'Error al hashear la contraseña', error });
        }
    }
};

export default UserController;
