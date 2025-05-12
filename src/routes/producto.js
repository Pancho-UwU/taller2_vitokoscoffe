import { productoController } from "../controller/producto.js";
import { Router } from "express";

const productoRouter = Router()

productoRouter.patch('/eliminarActivar/:id', productoController.deleteActiveProducts)
productoRouter.put('/crear',productoController.postProduct)
productoRouter.patch('/actualizar/:id',productoController.patchProduct)
productoRouter.get('/productos', productoController.getProducts)

export default productoRouter;