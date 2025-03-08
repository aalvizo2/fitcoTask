import AuthModel from '../models/AuthModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const AuthController = {
    login: async (req, res) => {
        const { Username, Password } = req.body;
        

        // Validar que se haya proporcionado una contraseña
        if (!Password) {
            return res.status(400).json({ Message: 'La contraseña es requerida' });
        }

        try {
            // Buscar al usuario en la base de datos
            AuthModel.findUserByUsername(Username, async (err, user) => {
                console.log(user)
                const isMatch= await bcrypt.compare(Password, user.password);
                
                if(!isMatch){
                    res.status(401).send({Message: "Credenciales incorrectas"});
                }

                if(isMatch){
                    const token= jwt.sign({
                        Username: user.username,
                        Email: user.email
                    },
                    'mysecret',
                    {
                        expiresIn: '1h'
                    }
                )
                    res.status(200).json({token: token});
                }else{
                    res.status(401).send({Message: 'Error de autenticación'})
                }
            });
        } catch (error) {
            console.error('Error en el proceso de login:', error);
            return res.status(500).json({ Message: 'Error interno del servidor' });
        }
    }
};

export default AuthController;