import prisma from "../config/prisma";

interface CrearEspecieData {
  nombre: string;
  descripcion?: string | null;
}

interface ActualizarEspecieData {
  nombre?: string;
  descripcion?: string | null;
  estado?: boolean;
}

export const obtenerEspecies = async () => {
  return await prisma.especie.findMany({
    where: {
      estado: true
    },
    orderBy: {
      id: "asc"
    }
  });
};

export const obtenerEspeciePorId = async (id: number) => {
  const especie = await prisma.especie.findUnique({
    where: {
      id
    },
    include: {
      razas: true
    }
  });

  if (!especie || !especie.estado) {
    throw new Error("La especie no existe");
  }

  return especie;
};

export const crearEspecie = async (data: CrearEspecieData) => {
  const nombreNormalizado = data.nombre.trim();

  const especieExistente = await prisma.especie.findUnique({
    where: {
      nombre: nombreNormalizado
    }
  });

  if (especieExistente) {
    throw new Error("Ya existe una especie con ese nombre");
  }

  return await prisma.especie.create({
    data: {
      nombre: nombreNormalizado,
      descripcion: data.descripcion || null,
      estado: true
    }
  });
};

export const actualizarEspecie = async (
  id: number,
  data: ActualizarEspecieData
) => {
  const especie = await prisma.especie.findUnique({
    where: {
      id
    }
  });

  if (!especie || !especie.estado) {
    throw new Error("La especie no existe");
  }

  if (data.nombre) {
    const nombreNormalizado = data.nombre.trim();

    const especieExistente = await prisma.especie.findUnique({
      where: {
        nombre: nombreNormalizado
      }
    });

    if (especieExistente && especieExistente.id !== id) {
      throw new Error("Ya existe otra especie con ese nombre");
    }

    data.nombre = nombreNormalizado;
  }

  return await prisma.especie.update({
    where: {
      id
    },
    data
  });
};

export const eliminarEspecie = async (id: number) => {
  const especie = await prisma.especie.findUnique({
    where: {
      id
    },
    include: {
      razas: true,
      mascotas: true
    }
  });

  if (!especie || !especie.estado) {
    throw new Error("La especie no existe");
  }

  if (especie.razas.length > 0 || especie.mascotas.length > 0) {
    throw new Error(
      "No se puede eliminar la especie porque tiene razas o mascotas asociadas"
    );
  }

  return await prisma.especie.update({
    where: {
      id
    },
    data: {
      estado: false
    }
  });
};