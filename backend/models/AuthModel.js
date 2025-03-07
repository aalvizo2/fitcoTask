import connection from "../database/database.js";


const AuthModel={
    login: (data, callback) => {
        const query = "SELECT * FROM usuarios WHERE username=? AND password=?";
        const values=[data.Username, data.Password];

        //Hacemos la consulta 
        connection.query(query, values, (err, result) => {
            if(err){
                callback(null, err);
                return;
            }
            callback(null, result)
        })
    },

    findUserByUsername: (username, callback) => {
        const query = "SELECT * FROM usuarios WHERE username = ?";
        connection.query(query, [username], (err, results) => {
            if (err || results.length === 0) {
                callback(err, null);
            } else {
                callback(null, results[0]);
            }
        });
    }
};

export default AuthModel;