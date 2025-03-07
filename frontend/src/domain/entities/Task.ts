export interface getTasks{
    id: string,
    titulo: string,
    descripcion: string,
    duedate: string,
    estatus: boolean
}


export interface newTask{
    titulo: string;
    descripcion: string;
    estatus: boolean,
    usuario: string;

}


export interface editTask{
    id: string,
    titulo: string;
    descripcion: string;
    estatus: boolean;
    usuario: string;
}


export interface deleteTask{
    id: string;
}