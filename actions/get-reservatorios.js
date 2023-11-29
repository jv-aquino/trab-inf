import prismadb from "@/lib/prismadb";

export const getVolumeTotal = async (lojaId) => {
  const volume = await prismadb.reservatorio.count({
    where: {
      lojaId,
    }
  });

  return volume;
};

export const getHidrogenio = async (lojaId) => {
  const hidrogenio = await prismadb.reservatorio.count({
    where: {
      lojaId,
    }
  });

  return hidrogenio;
};