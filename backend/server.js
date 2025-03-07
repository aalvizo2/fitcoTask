import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/UserRoutes.js';
import loginRoutes from './routes/LoginRoutes.js'


dotenv.config();


//Configuramos express
const app= express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Middleware para archivos json





//Configuramos el puerto
const port= process.env.PORT || 3000;

//Mandamos llamar al puerto 
app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);
});



app.use("/api/v1/User", userRoutes);
app.use("/api/v1/Auth", loginRoutes)

