import { getConnection } from '../databases/database';

//FUNCIÓN PARA OBTENER TODOS LOS DATOS DE TODAS LAS HERRAMIENTAS
const getusers=async(req,res)=>{
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM users");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.json({message:"Error"});
    }
}


//FUNCIÓN PARA REGISTRAR UNA NUEVA HERRAMIENTA
const adduser=async(req,res)=>{
    try {
        const {name,email,password,image} = req.body;
        if(name==undefined||email==undefined||password==undefined||idRol==undefined){
            res.status(400).json({message:"Bad Request"});
        }const idRol = 1;
        const newUser = {name,email,password,image,idRol};
        const connection = await getConnection();
        await connection.query("INSERT INTO users SET ?",newUser);
        res.json({message:"Success"});
    } catch (error) {
        res.status(500);
        res.json({message:"Error"});
    }
}


//FUNCIÓN PARA OBTENER UN USUARIO
const getuser= async(req,res)=>{
    try {
        const {id}= req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM users WHERE id=?",id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.json({message:"Error"});
    }
}

//FUNCIÓN PARA ELIMINAR UN USUARIO
const deleteuser= async(req,res)=>{
    try {
        const {id} = req.params;
        const connection = await getConnection();
        await connection.query("DELETE FROM users WHERE id = ?",id);
        res.json({message:"Success"});
    } catch (error) {
        res.status(500);
        res.json({message:"Error"});
    }
}

//FUNCIÓN PARA ACTUALIZAR UN USUARIO
const updateuser=async(req,res)=>{
    try {
        const {id} = req.params;
        const {name,email,password,image}=req.body;
        if(id==undefined||name==undefined||email==undefined||password==undefined){
            res.status(400).json({message:"Bad Request"})
        }
        const user ={name,email,password,image};
        const connection = await getConnection();
        await connection.query("UPDATE users SET = ? WHERE id = ?",[user,id]);
        res.json({message:"Success"});
    } catch (error) {
        res.status(500);
        res.json({message:"Error"});
    }
}

export const methods = {
    getusers,
    getuser,
    adduser,
    deleteuser,
    updateuser
};