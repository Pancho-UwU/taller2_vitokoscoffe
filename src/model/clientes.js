import connection from "../database/db.js";


export class clientes{

    static async getClientesNormales(){
        try{
            const [data] = await connection.query('SELECT * from Clientes where tipo = "normal";')
            return data[0];            
        }
        catch(error)
        {
            return {message: 'Error al obtener los datos',
                estados: false
            }
        }
    }
} 