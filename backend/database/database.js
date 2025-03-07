import mysql from 'mysql2';
import dotenv from 'dotenv';


dotenv.config();


const connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'fitco'
});


connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

export default connection;4