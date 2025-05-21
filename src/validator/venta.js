import {z} from 'zod';
/**
 * Shema para el producto individual.
 */
const productoVentaShema = z.object(
    {

        id_producto: z.number({ required_error: "El campo id_producto es obligatorio"}).int().positive({message: 'El id_producto numero debe ser positivo'}),
        cantidad: z.number({required_error: "El campo cantidad es obligatorio"}).int().positive({message: 'El cantidad numero debe ser positivo'}),
        precio: z.number({required_error: "El campo precio es obligatorio"}).positive({message: 'El precio numero debe ser positivo'})
    }
)
/**
 * Shema para la validación del arrary.
 */
const ventaShema = z.object({
    data: z.array(productoVentaShema).min(1,{message: 'Los productos enviados deben ser minimo 1'})

})
/**
 * Shema para validar el id_cliente que viene por parametro.
 */
const id_cliente =z.object({
    id:z.string().transform(
        (val) =>parseInt(val)
    ).refine(
        (val)=>!isNaN(val) && val>0,{
            message:"La id debe ser positiva, un numero y no nula"
        }
     )
})
/**
 * Valida el cuerpo de la solicitud que contiene un array de productos para una venta.
 *
 * @param {*} datos - Objeto que representa el cuerpo enviado en la solicitud, debe incluir
 *                    una propiedad `data` que sea un arreglo de productos.
 *
 * @returns {Object} Un objeto con tres propiedades:
 *  - `estado` {boolean}: `true` si la validación fue exitosa, `false` si falló.
 *  - `data` {any|null}: Los datos validados si la validación fue exitosa; `null` si falló.
 *  - `error` {ZodError|null}: El objeto de error de Zod si la validación falló; `null` si fue exitosa.
 */
export function productoValidate(datos)
{
    const result = ventaShema.safeParse(datos);
    return {
        estado: result.success,
        data: result.success ? result.data:null,
        error: result.success ? null: result.error

    }
}
/**
 * Valida la id_cliente que es entregada por parametro.
 * @param {*} dato un atributo de tipo string.
 * @returns Un objeto con tres propiedades:
 *  - `estado` {boolean}: `true` si la validación fue exitosa, `false` si falló.
 *  - `data` {any|null}: Los datos validados si la validación fue exitosa; `null` si falló.
 *  - `error` {ZodError|null}: El objeto de error de Zod si la validación falló; `null` si fue exitosa.
 */
export function id_Cliente_Validator(dato){
    const result = id_cliente.safeParse(dato);
    return {
        estado: result.success,
        data: result.success ? result.data:null,
        error: result.success ? null: result.error

    }
}