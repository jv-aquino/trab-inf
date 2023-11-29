import prismadb from '@/lib/prismadb'
import ReservatorioForm from '@/components/Reservatorios/ReservatorioForm';

export default async function ReservatorioPage({ params }) {
  const reservatorio = (params.reservatorioId !== 'new') ? await prismadb.reservatorio.findUnique({
    where: {
      id: params.reservatorioId
    }
  }) : null;

  return (
    <div>
      <ReservatorioForm 
        initialData={reservatorio} />    
    </div>
  )
}