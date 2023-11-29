import prismadb from "@/lib/prismadb";

export const getVidros = async (lojaId) => {
  const vidros = await prismadb.vidro.count({
    where: {
      lojaId,
    }
  });

  return vidros;
};