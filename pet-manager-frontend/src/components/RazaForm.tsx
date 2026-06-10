import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField
} from "@mui/material";

import type { Especie } from "../interfaces/especie.interface";
import type { CrearRazaRequest, Raza } from "../interfaces/raza.interface";

interface RazaFormProps {
  open: boolean;
  loading?: boolean;
  razaEditar?: Raza | null;
  especies: Especie[];
  onClose: () => void;
  onSubmit: (data: CrearRazaRequest) => void;
}

const RazaForm = ({
  open,
  loading = false,
  razaEditar,
  especies,
  onClose,
  onSubmit
}: RazaFormProps) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [especieId, setEspecieId] = useState("");

  const [errorNombre, setErrorNombre] = useState("");
  const [errorDescripcion, setErrorDescripcion] = useState("");
  const [errorEspecie, setErrorEspecie] = useState("");

  const esEdicion = Boolean(razaEditar);

  useEffect(() => {
    if (razaEditar) {
      setNombre(razaEditar.nombre);
      setDescripcion(razaEditar.descripcion || "");
      setEspecieId(String(razaEditar.especieId));
    } else {
      setNombre("");
      setDescripcion("");
      setEspecieId("");
    }

    setErrorNombre("");
    setErrorDescripcion("");
    setErrorEspecie("");
  }, [razaEditar, open]);

  const validarFormulario = () => {
    let valido = true;

    setErrorNombre("");
    setErrorDescripcion("");
    setErrorEspecie("");

    if (!nombre.trim()) {
      setErrorNombre("El nombre es obligatorio");
      valido = false;
    } else if (nombre.trim().length < 2) {
      setErrorNombre("El nombre debe tener al menos 2 caracteres");
      valido = false;
    }

    if (!especieId) {
      setErrorEspecie("Debe seleccionar una especie");
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
      descripcion: descripcion.trim() || null,
      especieId: Number(especieId)
    });
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth>
      <DialogTitle sx={{ fontWeight: 800 }}>
        {esEdicion ? "Editar raza" : "Nueva raza"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Nombre de la raza"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            error={Boolean(errorNombre)}
            helperText={errorNombre}
            fullWidth
            required
            autoFocus
          />

          <TextField
            select
            label="Especie"
            value={especieId}
            onChange={(event) => setEspecieId(event.target.value)}
            error={Boolean(errorEspecie)}
            helperText={
              errorEspecie ||
              "Selecciona la especie a la que pertenece esta raza."
            }
            fullWidth
            required
          >
            {especies.map((especie) => (
              <MenuItem key={especie.id} value={String(especie.id)}>
                {especie.nombre}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Descripción"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
            error={Boolean(errorDescripcion)}
            helperText={
              errorDescripcion ||
              "Ejemplo: Raza canina, variedad de pez, tipo de ave, etc."
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
          disabled={loading || especies.length === 0}
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

export default RazaForm;