import bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel.js';

const UserController = {
    createUser: async (req, res) => {
        const { Name, Email, Password } = req.body;
        const userData= {Name, Email, Password}
        console.log(req.body, 'datos a ingresar');

        // Hashing the password
        try {

            UserModel.getAllUsers(userData, async (err, result) => { 
                if (err) {
                    return res.status(500).json({ Message: "Error al verificar el usuario", err });
                }
            
                if (result.length > 0) {  // Corregido `length`
                    return res.status(401).json({ Message: "Este usuario ya se encuentra registrado" });
                }
            
                try {
                    const salt = await bcrypt.genSalt(10);  
                    const hashedPassword = await bcrypt.hash(Password, salt);  
            
                    const newData = { Name, Email, Password: hashedPassword };  
                    console.log(newData, "datos ingresados");
            
                    // Insertar el usuario en la base de datos
                    UserModel.createUsers(newData, (err, result) => {  
                        if (err) {
                            return res.status(500).json({ Message: "Error al crear usuario", err });
                        } 
                        return res.status(200).json({ Message: "Operación realizada con éxito" });
                    });
            
                } catch (error) {
                    return res.status(500).json({ Message: "Error en el proceso de registro", error });
                }
            });
            
            

        } catch (error) {
            console.error(error);
            return res.status(500).json({ Message: 'Error al hashear la contraseña', error });
        }
    },
    

    
};

export default UserController;
