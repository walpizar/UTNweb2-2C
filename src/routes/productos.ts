import { Router } from "express";
import ProductosController from "../controller/ProductosController";

const routes= Router();

routes.get('', ProductosController.getAll);
routes.get('/getById/:id', ProductosController.getById);
routes.post('create',ProductosController.add);


export default routes;