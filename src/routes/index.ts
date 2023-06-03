import { Router } from "express";
import producto from "./productos"

const routes= Router();

routes.use('/Productos',producto);


export default routes;