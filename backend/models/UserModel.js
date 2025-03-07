import connection from "../database/database.js";


const UserModel={
    createUsers: (userData, callback) => {
        const query= "INSERT INTO usuarios (username, email, password) VALUES (?,?,?)";
        const values= [userData.Name, userData.Email, userData.Password]
        connection.query(query, userData, (err, results) => {
            if(err){
                callback(err, null);
                return;
            }
            callback(null, results);
        })
    }
};

export default UserModel;