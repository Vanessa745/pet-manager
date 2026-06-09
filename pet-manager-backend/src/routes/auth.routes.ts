import { Router } from "express";

import { login, profile, register } from "../controllers/auth.controller";
import { verificarToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verificarToken, profile);

export default router;