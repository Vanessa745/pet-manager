import prisma from "../config/prisma";

interface CrearDuenoData {
  nombre: string;
  apellido: string;
  ci: string;
  telefono?: string | null;
  email?: string | null;
  direccion?: string | null;
}

interface ActualizarDuenoData {
  nombre?: string;
  apellido?: string;
  ci?: string;
  telefono?: string | null;
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

  const nuevoDueno = await prisma.dueno.create({
    data: {
      nombre: data.nombre.trim(),
      apellido: data.apellido.trim(),
      ci: ciNormalizado,
      telefono: data.telefono?.trim() || null,
      email: data.email?.trim() || null,
      direccion: data.direccion?.trim() || null
    }
  });

  return nuevoDueno;
};

export const actualizarDueno = async (
  id: number,
  data: ActualizarDuenoData
) => {
  const duenoExistente = await prisma.dueno.findFirst({
    where: {
      id,
      estado: true
    }
  });

  if (!duenoExistente) {
    throw new Error("El dueño no existe");
  }

  if (data.ci) {
    const ciNormalizado = data.ci.trim();

    const ciExistente = await prisma.dueno.findFirst({
      where: {
        ci: ciNormalizado,
        id: {
          not: id
        }
      }
    });

    if (ciExistente) {
      throw new Error("Ya existe otro dueño registrado con ese CI");
    }
  }

  const duenoActualizado = await prisma.dueno.update({
    where: {
      id
    },
    data: {
      nombre: data.nombre?.trim(),
      apellido: data.apellido?.trim(),
      ci: data.ci?.trim(),
      telefono:
        data.telefono === undefined ? undefined : data.telefono?.trim() || null,
      email: data.email === undefined ? undefined : data.email?.trim() || null,
      direccion:
        data.direccion === undefined ? undefined : data.direccion?.trim() || null,
      estado: data.estado
    }
  });

  return duenoActualizado;
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