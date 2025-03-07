import AuthModel from '../models/AuthModel.js';
import bcrypt from 'bcryptjs';



const AuthController= {
    login: (req, res) => {
        const { Username, Password } = req.body;
        console.log(req.body);

        // Buscar al usuario en la base de datos por su username
        AuthModel.findUserByUsername(Username, async (err, user) => {
            if (err || !user) {
                return res.status(400).json({ Message: 'Usuario no encontrado' });
            }

            // Comparar la contraseña proporcionada con la almacenada (encriptada)
            const isMatch = await bcrypt.compare(Password, user.Password);
            if (!isMatch) {
                return res.status(400).json({ Message: 'Contraseña incorrecta' });
            }

            // Si las contraseñas coinciden, generar el token
            const token = jwt.sign(
                { username: user.Username, email: user.Email },  // Puedes agregar más datos si lo necesitas
                process.env.JWT_SECRET,  // Debes tener un secreto para firmar el JWT
                { expiresIn: '1h' }  // El token expirará en 1 hora
            );

            // Enviar el token como respuesta
            return res.status(200).json({ Message: 'Login exitoso', token });
        });
    }
};

export default AuthController;