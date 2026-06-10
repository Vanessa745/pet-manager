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
  CrearDuenoRequest,
  Dueno
} from "../interfaces/dueno.interface";

interface DuenoFormProps {
  open: boolean;
  loading?: boolean;
  duenoEditar?: Dueno | null;
  onClose: () => void;
  onSubmit: (data: CrearDuenoRequest) => void;
}

const DuenoForm = ({
  open,
  loading = false,
  duenoEditar,
  onClose,
  onSubmit
}: DuenoFormProps) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [ci, setCi] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");

  const [errorNombre, setErrorNombre] = useState("");
  const [errorApellido, setErrorApellido] = useState("");
  const [errorCi, setErrorCi] = useState("");
  const [errorTelefono, setErrorTelefono] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorDireccion, setErrorDireccion] = useState("");

  const esEdicion = Boolean(duenoEditar);

  useEffect(() => {
    if (duenoEditar) {
      setNombre(duenoEditar.nombre);
      setApellido(duenoEditar.apellido);
      setCi(duenoEditar.ci);
      setTelefono(duenoEditar.telefono || "");
      setEmail(duenoEditar.email || "");
      setDireccion(duenoEditar.direccion || "");
    } else {
      setNombre("");
      setApellido("");
      setCi("");
      setTelefono("");
      setEmail("");
      setDireccion("");
    }

    setErrorNombre("");
    setErrorApellido("");
    setErrorCi("");
    setErrorTelefono("");
    setErrorEmail("");
    setErrorDireccion("");
  }, [duenoEditar, open]);

  const validarFormulario = () => {
    let valido = true;

    setErrorNombre("");
    setErrorApellido("");
    setErrorCi("");
    setErrorTelefono("");
    setErrorEmail("");
    setErrorDireccion("");

    if (!nombre.trim()) {
      setErrorNombre("El nombre es obligatorio");
      valido = false;
    } else if (nombre.trim().length < 2) {
      setErrorNombre("El nombre debe tener al menos 2 caracteres");
      valido = false;
    }

    if (!apellido.trim()) {
      setErrorApellido("El apellido es obligatorio");
      valido = false;
    } else if (apellido.trim().length < 2) {
      setErrorApellido("El apellido debe tener al menos 2 caracteres");
      valido = false;
    }

    if (!ci.trim()) {
      setErrorCi("El CI es obligatorio");
      valido = false;
    } else if (ci.trim().length < 5) {
      setErrorCi("El CI debe tener al menos 5 caracteres");
      valido = false;
    }

    if (telefono.trim() && telefono.trim().length < 7) {
      setErrorTelefono("El teléfono debe tener al menos 7 caracteres");
      valido = false;
    }

    if (email.trim() && !email.includes("@")) {
      setErrorEmail("El email no tiene un formato válido");
      valido = false;
    }

    if (direccion.trim().length > 150) {
      setErrorDireccion("La dirección no puede superar los 150 caracteres");
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
      apellido: apellido.trim(),
      ci: ci.trim(),
      telefono: telefono.trim() || null,
      email: email.trim() || null,
      direccion: direccion.trim() || null
    });
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth>
      <DialogTitle sx={{ fontWeight: 800 }}>
        {esEdicion ? "Editar dueño" : "Nuevo dueño"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            error={Boolean(errorNombre)}
            helperText={errorNombre}
            fullWidth
            required
            autoFocus
          />

          <TextField
            label="Apellido"
            value={apellido}
            onChange={(event) => setApellido(event.target.value)}
            error={Boolean(errorApellido)}
            helperText={errorApellido}
            fullWidth
            required
          />

          <TextField
            label="CI"
            value={ci}
            onChange={(event) => setCi(event.target.value)}
            error={Boolean(errorCi)}
            helperText={errorCi || "Documento de identidad del dueño."}
            fullWidth
            required
          />

          <TextField
            label="Teléfono"
            value={telefono}
            onChange={(event) => setTelefono(event.target.value)}
            error={Boolean(errorTelefono)}
            helperText={errorTelefono || "Opcional"}
            fullWidth
          />

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={Boolean(errorEmail)}
            helperText={errorEmail || "Opcional"}
            fullWidth
          />

          <TextField
            label="Dirección"
            value={direccion}
            onChange={(event) => setDireccion(event.target.value)}
            error={Boolean(errorDireccion)}
            helperText={errorDireccion || "Opcional"}
            fullWidth
            multiline
            minRows={2}
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

export default DuenoForm;