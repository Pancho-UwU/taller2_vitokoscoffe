import { ventaControllador } from "../controller/venta.js";
import { Router } from "express";

const ventaRouter = Router()

ventaRouter.put('/crearVenta/:id', ventaControllador.putVenta)
export default ventaRouter;