import { Router } from "express";

import {
  borrarMascota,
  editarMascota,
  listarMascotas,
  listarMascotasPorDueno,
  obtenerMascota,
  registrarMascota
} from "../controllers/mascota.controller";

import { verificarToken } from "../middlewares/auth.middleware";
import { verificarAdmin } from "../middlewares/role.middleware";

const router = Router();

router.get("/", verificarToken, listarMascotas);
router.get("/dueno/:duenoId", verificarToken, listarMascotasPorDueno);
router.get("/:id", verificarToken, obtenerMascota);

router.post("/", verificarToken, verificarAdmin, registrarMascota);
router.put("/:id", verificarToken, verificarAdmin, editarMascota);
router.delete("/:id", verificarToken, verificarAdmin, borrarMascota);

export default router;