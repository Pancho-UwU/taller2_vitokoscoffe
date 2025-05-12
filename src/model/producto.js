import connection from "../database/db.js";

export class productoModel{

    /**
     * Función que nos permite verificar y crear un producto nuevo por los datos entregados en parametros.
     * @param {*} data objeto que contiene todos los elementos para crear un producto.
     * @returns tiene 2 posibilidades de retorno, si el dato a actualizar no existe o hay un error en la base de datos, se retorna el estado de la ejecución es decir, 2 o 3 y el mensajee correspondiente,
    Si el objeto se creo correctamente devuelve: estado:1, data y mesensaje.
     */
    static async createProduct(data)
    {
        try{
            let query= 'SELECT COUNT(*) AS filas FROM productos WHERE nombre = ?'
            let params = [data.nombre];
            const [rows] = await connection.execute(query,params)
            if(rows[0].filas >0){
                return {
                    estado:2,
                    message:'Producto ya existe.'
                }
            }
            query = 'INSERT INTO productos(nombre,precio,stock,estado) VALUES(?,?,?,1)';
            params =[data.nombre,data.precio,data.stock]

            const [result] = await connection.execute(query,params);
            return {
                data:{
                    id:result.id,
                    nombre:data.nombre,
                    precio:data.precio,
                    stock:data.stock
                },
                estado: 1,
                message:'Producto creado'
            }
        }catch(error){
            return {
                estado:3,
                message:'ERROR en el servidor. '+ error.message 
            }
        }

    }
    /**
     * Función que nos permite verificar y actualizar un producto nuevo por los datos entregados en parametros.
     * @param {*} data objeto que contiene todos los elementos para actualizar un producto.
     * @returns tiene 2 posibilidades de retorno, si el dato a actualizar no existe o hay un error en la base de datos, se retorna el estado de la ejecución es decir, 2 o 3 y el mensajee correspondiente,
     * Si el objeto se actualizo correctamente devuelve: estado:1 y mesensaje.
     */
    static async updateProduct(data)
    {
        let params= [data.id,data.precio]
        try{
            let query ='SELECT count(*) as filas FROM productos WHERE id = ?'
            params = [data.id]
            const [rows] = await connection.execute(query,params);
            if(rows[0].filas ===0){
                return{
                    estado :2,
                    message:'Producto no existe.'
                }
            }
            query = 'UPDATE productos SET precio =? WHERE id = ?;'
            params = [data.precio,data.id];
            const [resultUpdate] = await connection.execute(query,params)
            if(resultUpdate.affectedRows === 1){
                return{
                    estado:1,
                    message: 'Datos actualizados correctamente;'
                }
            }
            return {
                estado:2,
                message: 'No se lograron actualizar los datos.'
            }
        }catch(error){
            return {estado:3,
                message:'ERROR EN LA BASE DE DATOS ' +error.message
            }
        }
    }
    /**
     * Metodo para obtener todos los productos activos 
     * @returns El return consta de 2 opciones, si no existen datos o hay error en la base de datos, se devuelven el estado y el mensaje en formato json.
     * Si la existen los datos, se envia el estado, mensaje y los datos. 
     */
    static async getProduct()
    {
        try{
            const query= 'SELECT * FROM productos WHERE estado = 1'
            const [rows] = await connection.query(query)
            if(rows.length ===0){
                return {
                    estado: 2,
                    message:'No se encontraron datos'
                }
            }
            return {
                estado:1,
                message: 'Se encontraron datos.',
                data: rows
            }
        }catch(error){
            return {
                estado: 3,
                message:'ERROR en la base de datos.'
            }
        }
    }
    /*
    @params{objeto} data - objeto que contiene todos los elementos para actualizar un  elimina o activa.
    @returns {objeto} .
    */
   /**
    * Función que nos permite verificar, elimina o activa un producto nuevo por los datos entregados en parametros.
    * @param {*} data objeto que contiene todos los elementos para desactivar o activar un producto.
    * @returns tiene 2 posibilidades de retorno, si el dato a actualizar no existe o hay un error en la base de datos, se retorna el estado de la ejecución es decir, 2 o 3 y el mensajee correspondiente,
    Si el objeto se creo correctamente devuelve: estado:1, y mesensaje
    */
     static async deleteActiveProducto(data)
    {
        let params= [data.id]
        try{
            let query ='SELECT estado as filas FROM productos WHERE id = ?'
            console.log(data.id)
            const [rows] = await connection.execute(query,params);
            console.log(rows[0])
            if(rows.length === 0){
                return{
                    estado :2,
                    message:'Producto no existe.'
                }
            }
            
            query = 'UPDATE productos SET estado =? WHERE id = ?;'
            params = [rows[0].filas===1? 0:1,data.id];
            const [resultUpdate] = await connection.execute(query,params)
            if(resultUpdate.affectedRows === 1){
                return{
                    estado:1,
                    message: 'Dato eliminado o activado correctamente;'
                }
            }
            return {
                estado:2,
                message: 'No se lograron actualizar los datos.'
            }
        }catch(error){
            return {estado:3,
                message:'ERROR EN LA BASE DE DATOS ' +error.message
            }
        }
    }
}