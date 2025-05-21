import connection from "../database/db.js";

export class ventaModel{
    /**
     * Modelo para crear una venta y sus detalles.
     *
     * @param {Array<Object>} data - Arreglo de objetos con los siguientes campos:
     *   @param {number} data[].ID_PRODUCTO - ID del producto.
     *   @param {number} data[].cantidad - Cantidad del producto seleccionada.
     *   @param {number} data[].precio - Precio del producto.
     * @param {number} id_cliente - ID del cliente que realiza la compra.
     * 
     * @returns {{ message: string, estado: boolean }} Un objeto con el mensaje de resultado y el estado de la operación.
     */
    static async crearVenta (data,id_cliente)
    {
        
        try{
            // Comprueba y busca el tipo de cliente
            let  query = 'SELECT tipo FROM Clientes WHERE id = ?'
            let params = [id_cliente];
            const [rows] = await connection.execute(query,params);
            let descuento = 0
            if(rows.length === 0){
                return { 
                    message: "Cliente no existente",
                    estado:false
                }
            }
            //descuento si es premium
            if(rows[0].tipo === "premium"){
                descuento = 0.2
            }

            let total  = 0;
            // precio total bruto del los cafes.
            data.forEach(element => {
                total += element.precio 
            });

            
            if(descuento === 0.2){
                total = total -total*0.2
            }
            
            total = total + total*0.1
            const fecha = new Date
            const fechaActual = fecha.toISOString().split('T')[0]
            // inserta la nueva venta que se va a realizar

            query = 'INSERT INTO Ventas(fecha,total,clientesid) VALUES(?,?,?);'
            params = [fechaActual,total,id_cliente]
            const [result] = await connection.execute(query,params);

            if(result.affectedRows === 0){
                return {
                    message: 'Venta no realizada',
                    estado:false
                }
            }
            // inserta los productos que se comparon
            query = 'INSERT INTO detalleventa (cantidad,subTotal,Ventasid,Productosid) VALUES(?,?,?,?);'
            data.forEach(async element => {
                //                                                             forma de obtener el id desde la inserción anterión
                params = [element.cantidad, element.precio * element.cantidad, result.insertId,element.id_producto]
                const [rest] = await connection.execute(query,params); 
                if(rest.affectedRows === 0 )
                    {
                        return {
                            message: 'Producto no agregado',
                            estado:false
                        }   
                    }
            });
        
            return{
                message:'Venta realizada',
                estado:true
            }
        }catch(error)
        {
            return{
                message:'Error en la base de datos '+ error.message,
                estado: false
            }
        }


    }
}