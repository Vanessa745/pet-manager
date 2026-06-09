import { Router } from "express";

import {
  borrarDueno,
  editarDueno,
  listarDuenos,
  obtenerDueno,
  registrarDueno
} from "../controllers/dueno.controller";

import { verificarToken } from "../middlewares/auth.middleware";
import { verificarAdmin } from "../middlewares/role.middleware";

const router = Router();

router.get("/", verificarToken, listarDuenos);
router.get("/:id", verificarToken, obtenerDueno);

router.post("/", verificarToken, verificarAdmin, registrarDueno);
router.put("/:id", verificarToken, verificarAdmin, editarDueno);
router.delete("/:id", verificarToken, verificarAdmin, borrarDueno);

export default router;