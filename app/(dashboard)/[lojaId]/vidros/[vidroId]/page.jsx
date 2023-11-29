import prismadb from '@/lib/prismadb'
import VidroForm from '@/components/Vidros/VidroForm';

export default async function VidroPage({ params }) {
  let vidro = null;
  if (params.vidroId !== 'new') {
    vidro = await prismadb.vidro.findUnique({
      where: {
        id: params.vidroId
      },
    });
  }
  
  return (
    <div>
      <VidroForm 
        initialData={vidro} 
      />    
    </div>
  )
}