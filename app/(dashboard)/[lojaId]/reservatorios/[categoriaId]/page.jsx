import prismadb from '@/lib/prismadb'
import CategoriaForm from '@/components/Reservatorios/ReservatorioForm';

export default async function CategoriaPage({ params }) {
  const categoria = (params.categoriaId !== 'new') ? await prismadb.categoria.findUnique({
    where: {
      id: params.categoriaId
    }
  }) : null;

  const empresas = await prismadb.empresa.findMany({
    where: {
      lojaId: params.lojaId,
    },
  });

  return (
    <div>
      <CategoriaForm 
        empresas={empresas}
        initialData={categoria} />    
    </div>
  )
}