import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Producto } from "../entity/Producto";

class ProductosController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const productosRepo = AppDataSource.getRepository(Producto);

      const listaProductos = await productosRepo.find({
        where: { estado: true },
      });

      if (listaProductos.length == 0) {
        return resp.status(404).json({ mensaje: "No se encontró resultados." });
      }
      return resp.status(200).json(listaProductos);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params["id"]);

      if (!id) {
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }

      const productosRepo = AppDataSource.getRepository(Producto);
      
      let producto;
      try {
        producto = await productosRepo.findOneOrFail({ where: { id } });
      } catch (error) {
        return resp
        .status(404)
        .json({ mensaje: "No se encontro el producto con ese ID" });
      }
      

      // if (!producto) {
      //   return resp
      //     .status(404)
      //     .json({ mensaje: "No se encontro el producto con ese ID" });
      // }

      return resp.status(200).json(producto);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {




    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }

    return resp.status(200).json({ mensaje: "create" });
  };

  static update = async (req: Request, resp: Response) => {};
  static delete = async (req: Request, resp: Response) => {};
}

export default ProductosController;
