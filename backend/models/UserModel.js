import connection from "../database/database.js";


const UserModel={
    createUsers: (userData, callback) => {
        const query= "INSERT INTO usuarios (username, email, password) VALUES (?,?,?)";
        const values= [userData.Name, userData.Email, userData.Password];

        console.log(values, 'valores ingresados');
        console.log(userData)
        connection.query(query, values, (err, results) => {
            if(err){
                callback(err, null);
                return;
            }
            callback(null, results);
        })
    },

    getAllUsers: (userData, callback) => {
        const query= "SELECT * FROM usuarios WHERE username=? AND email=?";
        const values= [userData.Name, userData.Email, userData.Password];

        connection.query(query, values, (err, results) => {
            if(err){
                callback(err, null);
                return;
            }
            callback(null, results)
        })
    }
};

export default UserModel;