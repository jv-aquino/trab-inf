import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale';
import prismadb from '@/lib/prismadb'

import ReservatoriosClient from "@/components/Reservatorios/ReservatorioClient"

export default async function ReservatoriosPage({ params }) {
  const reservatorios = await prismadb.reservatorio.findMany({
    where: {
      lojaId: params.lojaId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedReservatorios = reservatorios.map((item) => ({
    id: item.id,
    nome: item.nome,
    volumeTotal: item.volumeTotal,
    hidrogenio: item.hidrogenio,
    combustivel: item.combustivel,
    createdAt: format(item.createdAt,  "d' de 'MMMM', 'yyyy", { locale: ptBR }),
  }));

  return (
    <>
      <div>
        <ReservatoriosClient data={formattedReservatorios} />
      </div>
    </>
  )
}