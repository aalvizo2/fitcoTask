import connection from "../database/database.js";

const AuthModel = {
    findUserByUsername: (username, callback) => {
        const query = "SELECT * FROM usuarios WHERE username = ?";
        connection.query(query, [username], (err, results) => {
            if (err || results.length === 0) {
                return callback(err, null);
            }
            return callback(null, results[0]); // Retorna el primer usuario encontrado
        });
    }
};

export default AuthModel;

