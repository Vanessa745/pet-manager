import { Router } from "express";

import {
  borrarEspecie,
  editarEspecie,
  listarEspecies,
  obtenerEspecie,
  registrarEspecie
} from "../controllers/especie.controller";

import { verificarToken } from "../middlewares/auth.middleware";
import { verificarAdmin } from "../middlewares/role.middleware";

const router = Router();

router.get("/", verificarToken, listarEspecies);
router.get("/:id", verificarToken, obtenerEspecie);

router.post("/", verificarToken, verificarAdmin, registrarEspecie);
router.put("/:id", verificarToken, verificarAdmin, editarEspecie);
router.delete("/:id", verificarToken, verificarAdmin, borrarEspecie);

export default router;