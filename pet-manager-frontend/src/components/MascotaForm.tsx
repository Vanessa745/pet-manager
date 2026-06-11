import { useEffect, useMemo, useState } from "react";
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

import type { Dueno } from "../interfaces/dueno.interface";
import type { Especie } from "../interfaces/especie.interface";
import type { Raza } from "../interfaces/raza.interface";
import type {
  CrearMascotaRequest,
  Mascota,
  SexoMascota
} from "../interfaces/mascota.interface";

interface MascotaFormProps {
  open: boolean;
  loading?: boolean;
  mascotaEditar?: Mascota | null;
  duenos: Dueno[];
  especies: Especie[];
  razas: Raza[];
  onClose: () => void;
  onSubmit: (data: CrearMascotaRequest) => void;
}

const MascotaForm = ({
  open,
  loading = false,
  mascotaEditar,
  duenos,
  especies,
  razas,
  onClose,
  onSubmit
}: MascotaFormProps) => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState<SexoMascota>("DESCONOCIDO");
  const [color, setColor] = useState("");
  const [peso, setPeso] = useState("");
  const [imagen, setImagen] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const [duenoId, setDuenoId] = useState("");
  const [especieId, setEspecieId] = useState("");
  const [razaId, setRazaId] = useState("");

  const [errorNombre, setErrorNombre] = useState("");
  const [errorEdad, setErrorEdad] = useState("");
  const [errorPeso, setErrorPeso] = useState("");
  const [errorImagen, setErrorImagen] = useState("");
  const [errorObservaciones, setErrorObservaciones] = useState("");
  const [errorDueno, setErrorDueno] = useState("");
  const [errorEspecie, setErrorEspecie] = useState("");

  const esEdicion = Boolean(mascotaEditar);

  const razasFiltradas = useMemo(() => {
    if (!especieId) {
      return [];
    }

    return razas.filter((raza) => raza.especieId === Number(especieId));
  }, [razas, especieId]);

  useEffect(() => {
    if (mascotaEditar) {
      setNombre(mascotaEditar.nombre);
      setEdad(
        mascotaEditar.edad === null || mascotaEditar.edad === undefined
          ? ""
          : String(mascotaEditar.edad)
      );
      setSexo(mascotaEditar.sexo || "DESCONOCIDO");
      setColor(mascotaEditar.color || "");
      setPeso(
        mascotaEditar.peso === null || mascotaEditar.peso === undefined
          ? ""
          : String(mascotaEditar.peso)
      );
      setImagen(mascotaEditar.imagen || "");
      setObservaciones(mascotaEditar.observaciones || "");
      setDuenoId(String(mascotaEditar.duenoId));
      setEspecieId(String(mascotaEditar.especieId));
      setRazaId(
        mascotaEditar.razaId === null || mascotaEditar.razaId === undefined
          ? ""
          : String(mascotaEditar.razaId)
      );
    } else {
      setNombre("");
      setEdad("");
      setSexo("DESCONOCIDO");
      setColor("");
      setPeso("");
      setImagen("");
      setObservaciones("");
      setDuenoId("");
      setEspecieId("");
      setRazaId("");
    }

    limpiarErrores();
  }, [mascotaEditar, open]);

  const limpiarErrores = () => {
    setErrorNombre("");
    setErrorEdad("");
    setErrorPeso("");
    setErrorImagen("");
    setErrorObservaciones("");
    setErrorDueno("");
    setErrorEspecie("");
  };

  const validarFormulario = () => {
    let valido = true;

    limpiarErrores();

    if (!nombre.trim()) {
      setErrorNombre("El nombre de la mascota es obligatorio");
      valido = false;
    } else if (nombre.trim().length < 2) {
      setErrorNombre("El nombre debe tener al menos 2 caracteres");
      valido = false;
    }

    if (!duenoId) {
      setErrorDueno("Debe seleccionar un dueño");
      valido = false;
    }

    if (!especieId) {
      setErrorEspecie("Debe seleccionar una especie");
      valido = false;
    }

    if (edad.trim()) {
      const edadNumero = Number(edad);

      if (Number.isNaN(edadNumero)) {
        setErrorEdad("La edad debe ser un número");
        valido = false;
      } else if (edadNumero < 0) {
        setErrorEdad("La edad no puede ser negativa");
        valido = false;
      }
    }

    if (peso.trim()) {
      const pesoNumero = Number(peso);

      if (Number.isNaN(pesoNumero)) {
        setErrorPeso("El peso debe ser un número");
        valido = false;
      } else if (pesoNumero <= 0) {
        setErrorPeso("El peso debe ser mayor a 0");
        valido = false;
      }
    }

    if (
      imagen.trim() &&
      !imagen.trim().startsWith("http://") &&
      !imagen.trim().startsWith("https://")
    ) {
      setErrorImagen("La imagen debe ser una URL válida");
      valido = false;
    }

    if (observaciones.trim().length > 255) {
      setErrorObservaciones("Las observaciones no pueden superar 255 caracteres");
      valido = false;
    }

    return valido;
  };

  const handleCambiarEspecie = (value: string) => {
    setEspecieId(value);
    setRazaId("");
  };

  const handleSubmit = () => {
    if (!validarFormulario()) {
      return;
    }

    onSubmit({
      nombre: nombre.trim(),
      edad: edad.trim() ? Number(edad) : null,
      sexo,
      color: color.trim() || null,
      peso: peso.trim() ? Number(peso) : null,
      imagen: imagen.trim() || null,
      observaciones: observaciones.trim() || null,
      duenoId: Number(duenoId),
      especieId: Number(especieId),
      razaId: razaId ? Number(razaId) : null
    });
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={{ fontWeight: 800 }}>
        {esEdicion ? "Editar mascota" : "Nueva mascota"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Nombre de la mascota"
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
            label="Dueño"
            value={duenoId}
            onChange={(event) => setDuenoId(event.target.value)}
            error={Boolean(errorDueno)}
            helperText={errorDueno || "Selecciona el propietario de la mascota."}
            fullWidth
            required
          >
            {duenos.map((dueno) => (
              <MenuItem key={dueno.id} value={String(dueno.id)}>
                {dueno.nombre} {dueno.apellido} - CI: {dueno.ci}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Especie"
            value={especieId}
            onChange={(event) => handleCambiarEspecie(event.target.value)}
            error={Boolean(errorEspecie)}
            helperText={errorEspecie || "Selecciona la especie de la mascota."}
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
            select
            label="Raza"
            value={razaId}
            onChange={(event) => setRazaId(event.target.value)}
            helperText={
              especieId
                ? "Opcional. Solo se muestran razas de la especie seleccionada."
                : "Primero selecciona una especie."
            }
            fullWidth
            disabled={!especieId}
          >
            <MenuItem value="">Sin raza</MenuItem>

            {razasFiltradas.map((raza) => (
              <MenuItem key={raza.id} value={String(raza.id)}>
                {raza.nombre}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Sexo"
            value={sexo}
            onChange={(event) => setSexo(event.target.value as SexoMascota)}
            fullWidth
          >
            <MenuItem value="MACHO">Macho</MenuItem>
            <MenuItem value="HEMBRA">Hembra</MenuItem>
            <MenuItem value="DESCONOCIDO">Desconocido</MenuItem>
          </TextField>

          <TextField
            label="Edad"
            type="number"
            value={edad}
            onChange={(event) => setEdad(event.target.value)}
            error={Boolean(errorEdad)}
            helperText={errorEdad || "Opcional. Edad aproximada en años."}
            fullWidth
          />

          <TextField
            label="Color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            helperText="Opcional"
            fullWidth
          />

          <TextField
            label="Peso"
            type="number"
            value={peso}
            onChange={(event) => setPeso(event.target.value)}
            error={Boolean(errorPeso)}
            helperText={errorPeso || "Opcional. Peso aproximado en kg."}
            fullWidth
          />

          <TextField
            label="URL de imagen"
            value={imagen}
            onChange={(event) => setImagen(event.target.value)}
            error={Boolean(errorImagen)}
            helperText={errorImagen || "Opcional. Ejemplo: https://imagen.com/mascota.jpg"}
            fullWidth
          />

          <TextField
            label="Observaciones"
            value={observaciones}
            onChange={(event) => setObservaciones(event.target.value)}
            error={Boolean(errorObservaciones)}
            helperText={errorObservaciones || "Opcional"}
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
          disabled={loading || duenos.length === 0 || especies.length === 0}
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

export default MascotaForm;