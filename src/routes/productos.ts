import { Router } from "express";
import ProductosController from "../controller/ProductosController";

const routes = Router();

routes.get("", ProductosController.getAll);
routes.get("/getById/:id", ProductosController.getById);
routes.post("", ProductosController.add);
routes.patch("", ProductosController.update);
routes.delete("/:id", ProductosController.delete);
export default routes;
