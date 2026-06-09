import prisma from "../config/prisma";

interface CrearDuenoData {
  nombre: string;
  apellido: string;
  ci: string;
  telefono: string;
  email?: string | null;
  direccion?: string | null;
}

interface ActualizarDuenoData {
  nombre?: string;
  apellido?: string;
  ci?: string;
  telefono?: string;
  email?: string | null;
  direccion?: string | null;
  estado?: boolean;
}

export const obtenerDuenos = async () => {
  return await prisma.dueno.findMany({
    where: {
      estado: true
    },
    orderBy: {
      id: "asc"
    }
  });
};

export const obtenerDuenoPorId = async (id: number) => {
  const dueno = await prisma.dueno.findUnique({
    where: {
      id
    },
    include: {
      mascotas: {
        include: {
          especie: true,
          raza: true
        }
      }
    }
  });

  if (!dueno || !dueno.estado) {
    throw new Error("El dueño no existe");
  }

  return dueno;
};

export const crearDueno = async (data: CrearDuenoData) => {
  const ciNormalizado = data.ci.trim();

  const duenoExistente = await prisma.dueno.findUnique({
    where: {
      ci: ciNormalizado
    }
  });

  if (duenoExistente) {
    throw new Error("Ya existe un dueño registrado con ese CI");
  }

  return await prisma.dueno.create({
    data: {
      nombre: data.nombre.trim(),
      apellido: data.apellido.trim(),
      ci: ciNormalizado,
      telefono: data.telefono.trim(),
      email: data.email?.trim() || null,
      direccion: data.direccion?.trim() || null,
      estado: true
    }
  });
};

export const actualizarDueno = async (
  id: number,
  data: ActualizarDuenoData
) => {
  const dueno = await prisma.dueno.findUnique({
    where: {
      id
    }
  });

  if (!dueno || !dueno.estado) {
    throw new Error("El dueño no existe");
  }

  if (data.ci) {
    const ciNormalizado = data.ci.trim();

    const duenoExistente = await prisma.dueno.findUnique({
      where: {
        ci: ciNormalizado
      }
    });

    if (duenoExistente && duenoExistente.id !== id) {
      throw new Error("Ya existe otro dueño registrado con ese CI");
    }

    data.ci = ciNormalizado;
  }

  if (data.nombre) {
    data.nombre = data.nombre.trim();
  }

  if (data.apellido) {
    data.apellido = data.apellido.trim();
  }

  if (data.telefono) {
    data.telefono = data.telefono.trim();
  }

  if (data.email) {
    data.email = data.email.trim();
  }

  if (data.direccion) {
    data.direccion = data.direccion.trim();
  }

  return await prisma.dueno.update({
    where: {
      id
    },
    data
  });
};

export const eliminarDueno = async (id: number) => {
  const dueno = await prisma.dueno.findUnique({
    where: {
      id
    },
    include: {
      mascotas: true
    }
  });

  if (!dueno || !dueno.estado) {
    throw new Error("El dueño no existe");
  }

  if (dueno.mascotas.length > 0) {
    throw new Error(
      "No se puede eliminar el dueño porque tiene mascotas asociadas"
    );
  }

  return await prisma.dueno.update({
    where: {
      id
    },
    data: {
      estado: false
    }
  });
};