import prisma from "../config/prisma";

type SexoMascota = "MACHO" | "HEMBRA" | "DESCONOCIDO";

interface CrearMascotaData {
  nombre: string;
  edad?: number | null;
  sexo?: SexoMascota;
  color?: string | null;
  peso?: number | null;
  imagen?: string | null;
  observaciones?: string | null;
  duenoId: number;
  especieId: number;
  razaId?: number | null;
}

interface ActualizarMascotaData {
  nombre?: string;
  edad?: number | null;
  sexo?: SexoMascota;
  color?: string | null;
  peso?: number | null;
  imagen?: string | null;
  observaciones?: string | null;
  duenoId?: number;
  especieId?: number;
  razaId?: number | null;
  estado?: boolean;
}

export const obtenerMascotas = async () => {
  return await prisma.mascota.findMany({
    where: {
      estado: true
    },
    include: {
      dueno: true,
      especie: true,
      raza: true
    },
    orderBy: {
      id: "asc"
    }
  });
};

export const obtenerMascotaPorId = async (id: number) => {
  const mascota = await prisma.mascota.findUnique({
    where: {
      id
    },
    include: {
      dueno: true,
      especie: true,
      raza: true
    }
  });

  if (!mascota || !mascota.estado) {
    throw new Error("La mascota no existe");
  }

  return mascota;
};

export const obtenerMascotasPorDueno = async (duenoId: number) => {
  const dueno = await prisma.dueno.findUnique({
    where: {
      id: duenoId
    }
  });

  if (!dueno || !dueno.estado) {
    throw new Error("El dueño no existe");
  }

  return await prisma.mascota.findMany({
    where: {
      duenoId,
      estado: true
    },
    include: {
      especie: true,
      raza: true
    },
    orderBy: {
      id: "asc"
    }
  });
};

export const crearMascota = async (data: CrearMascotaData) => {
  const dueno = await prisma.dueno.findUnique({
    where: {
      id: data.duenoId
    }
  });

  if (!dueno || !dueno.estado) {
    throw new Error("El dueño no existe");
  }

  const especie = await prisma.especie.findUnique({
    where: {
      id: data.especieId
    }
  });

  if (!especie || !especie.estado) {
    throw new Error("La especie no existe");
  }

  if (data.razaId) {
    const raza = await prisma.raza.findUnique({
      where: {
        id: data.razaId
      }
    });

    if (!raza || !raza.estado) {
      throw new Error("La raza no existe");
    }

    if (raza.especieId !== data.especieId) {
      throw new Error("La raza seleccionada no pertenece a la especie indicada");
    }
  }

  return await prisma.mascota.create({
    data: {
      nombre: data.nombre.trim(),
      edad: data.edad ?? null,
      sexo: data.sexo || "DESCONOCIDO",
      color: data.color?.trim() || null,
      peso: data.peso ?? null,
      imagen: data.imagen?.trim() || null,
      observaciones: data.observaciones?.trim() || null,
      estado: true,
      duenoId: data.duenoId,
      especieId: data.especieId,
      razaId: data.razaId ?? null
    },
    include: {
      dueno: true,
      especie: true,
      raza: true
    }
  });
};

export const actualizarMascota = async (
  id: number,
  data: ActualizarMascotaData
) => {
  const mascota = await prisma.mascota.findUnique({
    where: {
      id
    }
  });

  if (!mascota || !mascota.estado) {
    throw new Error("La mascota no existe");
  }

  const duenoIdFinal = data.duenoId ?? mascota.duenoId;
  const especieIdFinal = data.especieId ?? mascota.especieId;

  const dueno = await prisma.dueno.findUnique({
    where: {
      id: duenoIdFinal
    }
  });

  if (!dueno || !dueno.estado) {
    throw new Error("El dueño no existe");
  }

  const especie = await prisma.especie.findUnique({
    where: {
      id: especieIdFinal
    }
  });

  if (!especie || !especie.estado) {
    throw new Error("La especie no existe");
  }

  let razaIdFinal = data.razaId;

  if (data.especieId && data.razaId === undefined) {
    razaIdFinal = null;
  }

  if (razaIdFinal) {
    const raza = await prisma.raza.findUnique({
      where: {
        id: razaIdFinal
      }
    });

    if (!raza || !raza.estado) {
      throw new Error("La raza no existe");
    }

    if (raza.especieId !== especieIdFinal) {
      throw new Error("La raza seleccionada no pertenece a la especie indicada");
    }
  }

  return await prisma.mascota.update({
    where: {
      id
    },
    data: {
      nombre: data.nombre?.trim(),
      edad: data.edad,
      sexo: data.sexo,
      color: data.color?.trim() || data.color,
      peso: data.peso,
      imagen: data.imagen?.trim() || data.imagen,
      observaciones: data.observaciones?.trim() || data.observaciones,
      duenoId: duenoIdFinal,
      especieId: especieIdFinal,
      razaId: razaIdFinal,
      estado: data.estado
    },
    include: {
      dueno: true,
      especie: true,
      raza: true
    }
  });
};

export const eliminarMascota = async (id: number) => {
  const mascota = await prisma.mascota.findUnique({
    where: {
      id
    }
  });

  if (!mascota || !mascota.estado) {
    throw new Error("La mascota no existe");
  }

  return await prisma.mascota.update({
    where: {
      id
    },
    data: {
      estado: false
    }
  });
};