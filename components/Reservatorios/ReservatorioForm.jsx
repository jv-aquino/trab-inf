"use client"

import { useParams } from "next/navigation";
import { useState } from "react"
import { toast } from "react-hot-toast";

import axios from "axios";
import { Trash } from "lucide-react"

import AlertModal from '../AlertModal'

export default function ReservatorioForm({ initialData }) {
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(initialData ? initialData : { nome: '' });

  const title = initialData ? "Editar Reservatorio" : "Criar Reservatorio";
  const description = initialData ? "Modifique ou exclua o Reservatorio" : "Adicione um novo Reservatorio";
  const toastMessage = initialData ? "Reservatorio atualizado." : "Reservatorio criado.";
  const action = initialData ? "Salvar mudanças" : "Criar Reservatorio";

  const handleSubmit =  async (e) => {
    e.preventDefault()
    if (!data?.porcentagem || !data?.nome || !data?.volumeTotal) { 
      return toast.error("Preencha todas as informações antes");
    }
    try {
      setLoading(true);
      data.volumeTotal = Number(data.volumeTotal);
      data.hidrogenio = (Number(data.porcentagem) / 100) * data.volumeTotal;
      data.combustivel = ((100 - Number(data.porcentagem)) / 100) * data.volumeTotal;
      if (initialData) {
        await axios.patch(`/api/${params.lojaId}/reservatorios/${params.reservatorioId}`, data);
      } else {
        await axios.post(`/api/${params.lojaId}/reservatorios`, data);
      }
      window.location.reload(true)
      window.location.assign(`/${params.lojaId}/reservatorios`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Algo deu errado.');
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.lojaId}/reservatorios/${params.reservatorioId}`);
      window.location.reload(true)
      window.location.assign(`/${params.lojaId}/reservatorios`);
      toast.success('Reservatorio deletada.');
    } catch (error) {
      toast.error('Remova todos os produtos da reservatorio antes.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }
  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)}
      onConfirm={handleDelete} loading={loading}/>
      <div className="flex flex-col px-5">
        <div className='flex items-center justify-between px-2 pt-4 pb-3 separator'>
          <div className="heading">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          {(initialData) ?
          <button className={"text-white rounded-md p-2 w-fit h-fit " + ((loading) ? "loading" : 'bg-red-500')}
          onClick={() => setOpen(true)}>
            <Trash className="h-5 w-5"/>
          </button> : null}
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className='pt-4 pb-3'>
          <div className="grid grid-cols-3 gap-x-9 gap-y-5">
            <div className="flex flex-col">
              <label htmlFor="nome" className="text-[17px] pb-1">Nome do Reservatorio: </label>
              <input type="text" id="nome" placeholder="Tanque 1" className="text-[16px]" value={data?.nome ?? ''} onChange={(e) => setData((prev) => {
                return { ...prev, nome: e.target.value }
              })} />
            </div>

            <div className="flex flex-col">
              <label htmlFor="volumeTotal" className="text-[17px] pb-1">Volume Total (L):</label>
              <input type="number" id="volumeTotal" name="volumeTotal" step="0.01" min="0.1" pattern="^\d+(.\d{1,2})?$" title="Informe um volume válido" placeholder="2000" required className="text-[16px] max-w-[250px]"
              value={data?.volumeTotal ?? ''} onChange={(e) => setData((prev) => {
                return { ...prev, volumeTotal: e.target.value }
              })} />
            </div>
          
          <div className="flex flex-col">
              <label htmlFor="porcentagem" className="text-[17px] pb-1">Porcentagem de hidrogênio:</label>
              <input type="number" id="porcentagem" name="porcentagem" step="0.01" min="1" max='6' pattern="^\d+(.\d{1,2})?$" title="Informe uma porcentagem válida" placeholder="5.50" required className="text-[16px] max-w-[250px]"
              value={data?.porcentagem ?? ''} onChange={(e) => setData((prev) => {
                return { ...prev, porcentagem: e.target.value }
              })} />
            </div>
          </div>
              
          <button type="submit" className={"mt-5 px-2.5 py-1.5 text-lg text-white font-semibold rounded-md transition " + ((loading) ? "loading" : 'bg-black hover:text-pink-200')} >{action}</button>
        </form>
      </div>
    </>
  )
}