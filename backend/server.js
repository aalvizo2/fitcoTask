import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/UserRoutes.js';
import loginRoutes from './routes/LoginRoutes.js'
import taskRoutes from './routes/taskRoutes.js';
import cors from 'cors';


dotenv.config();


//Configuramos express
const app= express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Configuramos cors
const allowedOrigins= ["http://localhost:5173"];


const corsOptions={
    origin: function (origin, callback){
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error("No autorizado por CORS"))
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions))




//Configuramos el puerto
const port= process.env.PORT || 3000;

//Mandamos llamar al puerto 
app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);
});



app.use("/api/v1/User", userRoutes);
app.use("/api/v1/Auth", loginRoutes);
app.use("/api/v1/Task", taskRoutes)

