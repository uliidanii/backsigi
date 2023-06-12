import { getConnection } from '../databases/database';
import qrcode from 'qrcode';

//FUNCIÓN PARA OBTENER TODOS LOS DATOS DE TODAS LAS HERRAMIENTAS
const gettools = async (req, res) => {
    try {
        const connection = await getConnection();
        console.log("Conexión exitosa a la base de datos")
        const result = await connection.query("SELECT id,status,name,inventoryQuantity,code,quantityAvailable FROM tools");
        console.log(result);
        res.json(result);

    } catch (error) {
        res.status(500);
        res.json({message:"Error"});
    }
}

//FUNCIÓN PARA REGISTRAR UNA NUEVA HERRAMIENTA
const addtool = async (req, res) => {
    try {
        const {name,idCategory,image,description,inventoryQuantity}=req.body;
        if(name==undefined||idCategory==undefined||inventoryQuantity==undefined){
            res.status(400).json({message:"Bad Request"})
        }
        const connection = await getConnection();
        // obtener el nombre de la categoria
        const category = await connection.query("SELECT name FROM toolcategories WHERE id=?",idCategory);
        const nameCategory = category[0].name;
        //generar código para "code"
        const codePrefix = nameCategory.substring(0,3);
        const tools = await connection.query("SELECT code FROM tools WHERE code LIKE ?",[`${codePrefix}%`]);
        const lastCode = tools.length > 0 ? tools[tools.length-1].code : 1;
        const nextNumber = parseInt(lastCode.substring(3))+1;
        const code = codePrefix+nextNumber;
        let toolId;
        const qr = null;
        let status=0;
        const quantityAvailable = inventoryQuantity;
        if(inventoryQuantity===1){
            status=1;
        }
        const newTool={
            code,
            name,
            idCategory,
            image,
            description,
            qr,
            inventoryQuantity,
            quantityAvailable,
            status
        }
        const result = await connection.query("INSERT INTO tools SET ?",newTool);
        //GENERAR QR
        toolId = result.insertId;
        // console.log("toolId: ",toolId);
        await generateQR(toolId);
        res.json({message:"Success"});

    } catch (error) {
        console.log(error);
        res.json({message:"Error"});
    }
}

const generateQR=async(toolId)=>{
    try {
        const qr = await qrcode.toDataURL(toolId.toString());   
        const connection = await getConnection();
        await connection.query("UPDATE tools SET qr = ? WHERE id = ?",[qr,toolId]);
        console.log("QR Generado");
    } catch (error) {
        console.log("Error al generar qr: ",error);
    }
}

const gettool = async (req, res) => {
    try {
        console.log(req.params);
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tools WHERE id = ?",id);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.json({message:"Error"});
    }
}

const deletetool= async(req,res)=>{
    try {
        const {id} = req.params;
        const connection = await getConnection();
        await connection.query("DELETE FROM tools WHERE id = ?",id);
        res.json({message:"Success"});
    } catch (error) {
        res.status(500);
        res.json({message:"Error"});
    }
}

const updatetool=async(req,res)=>{
    try {
        const {id} = req.params;
        const {name,image,description,inventoryQuantity}=req.body;
        if(id==undefined||name==undefined||inventoryQuantity==undefined){
            res.status(400).json({message:"Bad Request"})
        }
        const tool ={name,image,description,inventoryQuantity};
        const connection = await getConnection();
        await connection.query("UPDATE tools SET = ? WHERE id = ?",[tool,id]);
        res.json({message:"Success"});
    } catch (error) {
        res.status(500);
        res.json({message:"Error"});
    }
}

export const methods = {
    gettools,
    addtool,
    gettool,
    deletetool,
    updatetool,
    generateQR
};