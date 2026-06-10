import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField
} from "@mui/material";

import type {
  CrearEspecieRequest,
  Especie
} from "../interfaces/especie.interface";

interface EspecieFormProps {
  open: boolean;
  loading?: boolean;
  especieEditar?: Especie | null;
  onClose: () => void;
  onSubmit: (data: CrearEspecieRequest) => void;
}

const EspecieForm = ({
  open,
  loading = false,
  especieEditar,
  onClose,
  onSubmit
}: EspecieFormProps) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [errorDescripcion, setErrorDescripcion] = useState("");

  const esEdicion = Boolean(especieEditar);

  useEffect(() => {
    if (especieEditar) {
      setNombre(especieEditar.nombre);
      setDescripcion(especieEditar.descripcion || "");
    } else {
      setNombre("");
      setDescripcion("");
    }

    setErrorNombre("");
    setErrorDescripcion("");
  }, [especieEditar, open]);

  const validarFormulario = () => {
    let valido = true;

    setErrorNombre("");
    setErrorDescripcion("");

    if (!nombre.trim()) {
      setErrorNombre("El nombre es obligatorio");
      valido = false;
    } else if (nombre.trim().length < 2) {
      setErrorNombre("El nombre debe tener al menos 2 caracteres");
      valido = false;
    }

    if (descripcion.trim().length > 255) {
      setErrorDescripcion("La descripción no puede superar los 255 caracteres");
      valido = false;
    }

    return valido;
  };

  const handleSubmit = () => {
    if (!validarFormulario()) {
      return;
    }

    onSubmit({
      nombre: nombre.trim(),
      descripcion: descripcion.trim() || null
    });
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth>
      <DialogTitle sx={{ fontWeight: 800 }}>
        {esEdicion ? "Editar especie" : "Nueva especie"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Nombre de la especie"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            error={Boolean(errorNombre)}
            helperText={errorNombre}
            fullWidth
            required
            autoFocus
          />

          <TextField
            label="Descripción"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
            error={Boolean(errorDescripcion)}
            helperText={
              errorDescripcion || "Ejemplo: Mamífero doméstico, ave, pez, reptil."
            }
            fullWidth
            multiline
            minRows={3}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            bgcolor: "#0f766e",
            "&:hover": {
              bgcolor: "#115e59"
            }
          }}
        >
          {loading ? "Guardando..." : esEdicion ? "Guardar cambios" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EspecieForm;