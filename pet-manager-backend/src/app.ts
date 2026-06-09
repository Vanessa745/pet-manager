import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import especieRoutes from "./routes/especie.routes";
import razaRoutes from "./routes/raza.routes";
import duenoRoutes from "./routes/dueno.routes";
import mascotaRoutes from "./routes/mascota.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "API Pet Manager funcionando correctamente"
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "OK",
    message: "Backend funcionando correctamente"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/especies", especieRoutes);
app.use("/api/razas", razaRoutes);
app.use("/api/duenos", duenoRoutes);
app.use("/api/mascotas", mascotaRoutes);

export default app;