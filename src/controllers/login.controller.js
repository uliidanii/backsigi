import {getConnection} from '../databases/database';
import jwt from 'jsonwebtoken';

const secretKey = 'sigi';

const login=async(req,res)=>{
    try {
        const {email,password} = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM users WHERE email=? AND password =?",[email,password]);
        if(result.length>0){
            // const user = result[0];
            // const idUser = user.id;
            // const token= jwt.sign({userId:idUser},secretKey,{expiresIn:'100m'});
            // res.json({token:token});
            res.json({message:"Success"});
        }else{
            res.json({message:"No Valid"});
        }
    } catch (error) {
        res.status(500).json({message:"Error"});
    }
}

export const methods={
    login
}