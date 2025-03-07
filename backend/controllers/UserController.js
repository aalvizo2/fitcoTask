import UserModel from '../models/UserModel.js';

const UserController ={
    createUser: (req, res) => {
        const{Name, Email, Password}= req.body;
        
        const newData= {Name, Email, Password};
        UserModel.createUsers(newData, (err, result) => {
            if(err){
                res.status(500).json({Message: 'Error al crear usuario'})
            }else{
                res.status(200).json({Message: 'Operación realizada con éxito'});
            }
        })
    }
};

export default UserController;