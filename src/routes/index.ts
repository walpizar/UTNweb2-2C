import { Router } from "express";
import producto from "./productos";
import auth from "./auth";
import usuarios from "./usuarios";
const routes = Router();

routes.use("/Productos", producto);
routes.use("/Auth", auth);
routes.use("/Usuarios", usuarios);

export default routes;
