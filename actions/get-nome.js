import prismadb from "@/lib/prismadb";

export const getNome = async (lojaId) => {
  const loja = await prismadb.loja.findFirst({
    where: {
      id: lojaId,
    }
  })

  return loja.nome;
};