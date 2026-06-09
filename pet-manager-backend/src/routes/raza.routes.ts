import { Router } from "express";

import {
  borrarRaza,
  editarRaza,
  listarRazas,
  listarRazasPorEspecie,
  obtenerRaza,
  registrarRaza
} from "../controllers/raza.controller";

import { verificarToken } from "../middlewares/auth.middleware";
import { verificarAdmin } from "../middlewares/role.middleware";

const router = Router();

router.get("/", verificarToken, listarRazas);
router.get("/especie/:especieId", verificarToken, listarRazasPorEspecie);
router.get("/:id", verificarToken, obtenerRaza);

router.post("/", verificarToken, verificarAdmin, registrarRaza);
router.put("/:id", verificarToken, verificarAdmin, editarRaza);
router.delete("/:id", verificarToken, verificarAdmin, borrarRaza);

export default router;