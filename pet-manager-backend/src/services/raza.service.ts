import prisma from "../config/prisma";

interface CrearRazaData {
  nombre: string;
  descripcion?: string | null;
  especieId: number;
}

interface ActualizarRazaData {
  nombre?: string;
  descripcion?: string | null;
  especieId?: number;
  estado?: boolean;
}

export const obtenerRazas = async () => {
  return await prisma.raza.findMany({
    where: {
      estado: true
    },
    include: {
      especie: true
    },
    orderBy: {
      id: "asc"
    }
  });
};

export const obtenerRazaPorId = async (id: number) => {
  const raza = await prisma.raza.findUnique({
    where: {
      id
    },
    include: {
      especie: true
    }
  });

  if (!raza || !raza.estado) {
    throw new Error("La raza no existe");
  }

  return raza;
};

export const obtenerRazasPorEspecie = async (especieId: number) => {
  const especie = await prisma.especie.findUnique({
    where: {
      id: especieId
    }
  });

  if (!especie || !especie.estado) {
    throw new Error("La especie no existe");
  }

  return await prisma.raza.findMany({
    where: {
      especieId,
      estado: true
    },
    orderBy: {
      nombre: "asc"
    }
  });
};

export const crearRaza = async (data: CrearRazaData) => {
  const nombreNormalizado = data.nombre.trim();

  const especie = await prisma.especie.findUnique({
    where: {
      id: data.especieId
    }
  });

  if (!especie || !especie.estado) {
    throw new Error("La especie no existe");
  }

  const razaExistente = await prisma.raza.findUnique({
    where: {
      nombre_especieId: {
        nombre: nombreNormalizado,
        especieId: data.especieId
      }
    }
  });

  if (razaExistente) {
    throw new Error("Ya existe una raza con ese nombre para esta especie");
  }

  return await prisma.raza.create({
    data: {
      nombre: nombreNormalizado,
      descripcion: data.descripcion || null,
      especieId: data.especieId,
      estado: true
    },
    include: {
      especie: true
    }
  });
};

export const actualizarRaza = async (
  id: number,
  data: ActualizarRazaData
) => {
  const raza = await prisma.raza.findUnique({
    where: {
      id
    }
  });

  if (!raza || !raza.estado) {
    throw new Error("La raza no existe");
  }

  const especieIdFinal = data.especieId ?? raza.especieId;

  const especie = await prisma.especie.findUnique({
    where: {
      id: especieIdFinal
    }
  });

  if (!especie || !especie.estado) {
    throw new Error("La especie no existe");
  }

  if (data.nombre) {
    const nombreNormalizado = data.nombre.trim();

    const razaExistente = await prisma.raza.findUnique({
      where: {
        nombre_especieId: {
          nombre: nombreNormalizado,
          especieId: especieIdFinal
        }
      }
    });

    if (razaExistente && razaExistente.id !== id) {
      throw new Error("Ya existe otra raza con ese nombre para esta especie");
    }

    data.nombre = nombreNormalizado;
  }

  return await prisma.raza.update({
    where: {
      id
    },
    data,
    include: {
      especie: true
    }
  });
};

export const eliminarRaza = async (id: number) => {
  const raza = await prisma.raza.findUnique({
    where: {
      id
    },
    include: {
      mascotas: true
    }
  });

  if (!raza || !raza.estado) {
    throw new Error("La raza no existe");
  }

  if (raza.mascotas.length > 0) {
    throw new Error(
      "No se puede eliminar la raza porque tiene mascotas asociadas"
    );
  }

  return await prisma.raza.update({
    where: {
      id
    },
    data: {
      estado: false
    }
  });
};