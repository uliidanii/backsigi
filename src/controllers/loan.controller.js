import { getConnection } from '../databases/database';

const getloans = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM loans");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.json({message:"Error"});
    }
}

const getloan = async (req, res) => {
    try {
        const {id} = req.params;
        if(id==undefined){
            res.status(400).json({message:"Bad Request"});
        }
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM loans WHERE id = ?",id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.json({message:"Error"});
    }
}

const addloan=async(req,res)=>{
    try {
        const {project,} = req.body;
        // primero se registra el prestamo en "loan"
        const idUser = 1;
        const dateLoan = new Date();
        const dateReturn=null;
        const newLoan = {idUser,project,dateLoan,dateReturn};
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO loans SET = ?",newLoan);
        const loanId = result.insertId; // se obtiene el ultimo id registrado del prestamo
        // segundo se registran las herramientas en "loantools" con relación a "loan"
        
    } catch (error) {
        res.json({message:"Error"})
    }
}

export const methods={
    getloans,
    getloan,
    addloan
}