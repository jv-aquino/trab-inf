import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale';
import prismadb from '@/lib/prismadb'

import CategoriasClient from "@/components/Reservatorios/ReservatorioClient"

export default async function CategoriasPage({ params }) {
  const categorias = await prismadb.categoria.findMany({
    where: {
      lojaId: params.lojaId
    },
    include: {
      empresa: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedCategorias = categorias.map((item) => ({
    id: item.id,
    nome: item.nome,
    descricao: item.descricao,
    empresa: item.empresa.nome,
    createdAt: format(item.createdAt,  "d' de 'MMMM', 'yyyy", { locale: ptBR }),
  }));

  return (
    <>
      <div>
        <CategoriasClient data={formattedCategorias} />
      </div>
    </>
  )
}