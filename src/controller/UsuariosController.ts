import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuarios } from "../entity/Usuario";
import { validate } from "class-validator";
import { errorMonitor } from "events";

class UsuariosController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const repoUsuario = AppDataSource.getRepository(Usuarios);
      const listaUsuario = await repoUsuario.find({ where: { estado: true } });

      if (listaUsuario.length == 0) {
        return resp
          .status(404)
          .json({ mensaje: "No hay registros de usuarios" });
      }

      return resp.status(200).json(listaUsuario);
    } catch (error) {
      return resp
        .status(400)
        .json({ mensaje: "Error desconocido. PAGUE 50MIL DOLARES" });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      const {
        cedula,
        nombre,
        apellido1,
        apellido2,
        fecha_ingreso,
        correo,
        rol,
        contrasena,
      } = req.body;

      if (!cedula) {
        resp.status(400).json({ mensaje: "Falta la cedula" });
      } else if (!nombre) {
        resp.status(400).json({ mensaje: "Falta el nombre" });
      } else if (!apellido1) {
        resp.status(400).json({ mensaje: "Falta el apellido 1" });
      } else if (!apellido2) {
        resp.status(400).json({ mensaje: "Falta el apellido 2" });
      } else if (!fecha_ingreso) {
        resp.status(400).json({ mensaje: "Falta la fecha ingreso" });
      } else if (!correo) {
        resp.status(400).json({ mensaje: "Falta el correo" });
      } else if (!contrasena) {
        resp.status(400).json({ mensaje: "Falta la contraseña" });
      } else if (!rol) {
        resp.status(400).json({ mensaje: "Falta el rol" });
      }

      const repoUsuario = AppDataSource.getRepository(Usuarios);
      let usuario = await repoUsuario.findOne({ where: { cedula: cedula } });
      if (usuario) {
        resp.status(400).json({ mensaje: "El usuario ya existe" });
      }
      usuario = await repoUsuario.findOne({ where: { correo: correo } });
      if (usuario) {
        resp
          .status(400)
          .json({ mensaje: "Ya existe un usuario registrado con el correo" });
      }

      usuario = new Usuarios();
      usuario.cedula = cedula;
      usuario.nombre = nombre;
      usuario.apellido1 = apellido1;
      usuario.apellido2 = apellido2;
      usuario.fecha_ingreso = fecha_ingreso;
      usuario.correo = correo;
      usuario.contrasena = contrasena;
      usuario.rol = rol;
      usuario.estado = true;

      const validateOpt = { validationError: { target: false, value: false } };
      const errores = await validate(usuario, validateOpt);

      if (errores.length != 0) {
        return resp.status(400).json(errores);
      }

      usuario.hashPassword();

      try {
        await repoUsuario.save(usuario);
        return resp.status(201).json({ mensaje: "Se ha creado el usuario" });
      } catch (error) {
        resp.status(400).json(error);
      }
    } catch (error) {
      resp
        .status(400)
        .json({ mensaje: "Error desconocido. PAGUE 50MIL DOLARES" });
    }
  };
}

export default UsuariosController;
