import { Router } from "express";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    status: "OK",
    message: "Backend funcionando correctamente",
  });
});

export default router;