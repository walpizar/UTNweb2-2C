import { Router } from "express";
import ProductosController from "../controller/ProductosController";

const routes= Router();

routes.get('getAll', ProductosController.getAll);
routes.post('create',ProductosController.add);


export default routes;