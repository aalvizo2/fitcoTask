import express from 'express';
import dotenv from 'dotenv';
import database from './database/database.js';
import userRoutes from './routes/UserRoutes.js';

dotenv.config();


//Configuramos express
const app= express();


app.use(express.urlencoded({ extended: true }));

//Middleware para archivos json
app.use(express.json());




//Configuramos el puerto
const port= process.env.PORT || 3000;

//Mandamos llamar al puerto 
app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);
});


app.use('/', (req, res) => {
    res.send('Hola mundo')
})
app.use("/api/v1/User", userRoutes);


