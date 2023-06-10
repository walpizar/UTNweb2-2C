import { Router } from "express";
import producto from "./productos";
import auth from "./auth";
const routes = Router();

routes.use("/Productos", producto);
routes.use("/Auth", auth);
export default routes;
