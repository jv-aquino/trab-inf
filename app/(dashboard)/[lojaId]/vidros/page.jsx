import { format } from 'date-fns'
import { formatter } from "@/lib/utils";
import { ptBR } from 'date-fns/locale';

import prismadb from '@/lib/prismadb'

import VidroClient from "@/components/Vidros/VidroClient"

export default async function Vidros({ params }) {
  const vidros = await prismadb.vidro.findMany({
    where: {
      lojaId: params.lojaId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedVidros = vidros.map((item) => ({
    id: item.id,
    nome: item.nome,
    area: item.area,
    preco: item.preco,
    estoque: item.estoque,
    createdAt: format(item.createdAt,  "d' de 'MMMM', 'yyyy", { locale: ptBR }),
  }));

  return (
    <>
      <div>
        <VidroClient data={formattedVidros} />
      </div>
    </>
  )
}