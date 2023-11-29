import prismadb from "@/lib/prismadb";

export const getVolumeTotal = async (lojaId) => {
  const reservatorios = await prismadb.reservatorio.findMany({
    where: {
      lojaId,
    },
  });

  const sumVolumeTotal = reservatorios.reduce(
    (sum, reservatorio) => sum + (reservatorio.volumeTotal || 0),
    0
  );

  return sumVolumeTotal;
};

export const getHidrogenio = async (lojaId) => {
  const reservatorios = await prismadb.reservatorio.findMany({
    where: {
      lojaId,
    },
  });

  const sumHidrogenio = reservatorios.reduce(
    (sum, reservatorio) => sum + (reservatorio.hidrogenio || 0),
    0
  );

  return sumHidrogenio;
};
