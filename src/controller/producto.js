import { tr } from "@faker-js/faker";
import { productoModel } from "../model/producto.js";

export class productoController{
    /**
     * Endpoint para crear un producto en base a la función createProduct
     * @param {*} req elemento de express para los requerimiento, se ocuparan par obtener datos
     * @param {*} res Elemento de express para las soluciones, se ocupara para devolver datos y esado de la solicitud. 
     * @returns Retorna datos si existen, si no, retornara mensaje de error.
     */
    static async postProduct (req,res){
        const params ={
            nombre:req.body.nombre,
            precio:req.body.precio,
            stock:req.body.stock
        }
        try{
            const {data,message,estado} = await productoModel.createProduct(params);
            if(estado ===2 || estado ===3){
                return res.status(estado ===2? 400 :500).json({message:message})
            }
            return res.status(201).json(data)
        }catch(error){
            return res.status(500).json({message:'error en el servidor '+ error.message})
        }

    }
     /**
     * Endpoint para actualizar un producto en base a la función createProduct
     * @param {*} req elemento de express para los requerimiento, se ocuparan par obtener datos
     * @param {*} res Elemento de express para las soluciones, se ocupara para devolver datos y esado de la solicitud. 
     * @returns Retornara el mensaje para cada acción correspondiente.
     */
    static async patchProduct(req,res){
        const params ={
            id: req.params.id,
            precio: req.body.precio
         }
         try{
            const {message,estado} = await productoModel.updateProduct(params)
            if(estado === 2|| estado ===3){
                return res.status(estado ===2? 400:500).json(message)
            }
            return res.status(202).json(message)
         }catch(erro){
            return res.status(500).json({message:'ERROR en el servidor ' +error.message})
         }
    }
     /**
     * Endpoint para obtener los producto en base a la función createProduct
     * @param {*} req elemento de express para los requerimiento, se ocuparan par obtener datos
     * @param {*} res Elemento de express para las soluciones, se ocupara para devolver datos y esado de la solicitud. 
     * @returns Retorna datos si existen, si no, retornara mensaje de error.
     */
    static async getProducts(req,res)
    {
        try{
            const {data, message, estado} = await productoModel.getProduct()
            if(estado === 2|| estado ===3){
                return res.status(estado ===2? 400:500).json(message)
            }
            return res.status(200).json(data)
        }catch(erro){
            return res.status(500).json({message:'ERROR en el servidor ' +error.message})
        }
    }
     /**
     * Endpoint para activar/desactivar un producto en base a la función createProduct
     * @param {*} req elemento de express para los requerimiento, se ocuparan par obtener datos
     * @param {*} res Elemento de express para las soluciones, se ocupara para devolver datos y esado de la solicitud. 
     * @returns Retornara el mensaje para cada acción correspondiente.
     */
    static async deleteActiveProducts(req,res)
    {
        const params ={id:req.params.id}
        try{
            const {message,estado} = await productoModel.deleteActiveProducto(params)
            if(estado === 2|| estado ===3){
                return res.status(estado ===2? 400:500).json(message)
            }
            return res.status(202).json(message)
         }catch(erro){
            return res.status(500).json({message:'ERROR en el servidor ' +error.message})
         }
    }
    
}