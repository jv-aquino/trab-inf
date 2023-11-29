"use client"

import { useParams } from "next/navigation";
import { useState } from "react"
import { toast } from "react-hot-toast";

import axios from "axios";
import { Trash } from "lucide-react"

import AlertModal from '../AlertModal'
import ImageUpload from "../ImageUpload";

export default function VidroForm({ initialData }) {
  const params = useParams()

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(initialData ?? { nome: '' });

  const title = initialData ? "Editar Vidro" : "Criar Vidro";
  const description = initialData ? "Modifique ou exclua o Vidro" : "Adicione um novo Vidro";
  const toastMessage = initialData ? "Vidro atualizado." : "Vidro criado.";
  const action = initialData ? "Salvar mudanças" : "Criar Vidro";

  const handleSubmit =  async (e) => {
    e.preventDefault()
    if (!data?.nome || !data?.area || !data?.preco || !data?.estoque) { 
      console.log(data)
      return toast.error("Preencha todas as informações antes");
    }
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.lojaId}/vidros/${params.vidroId}`, data);
      } else {
        await axios.post(`/api/${params.lojaId}/vidros`, data);
      }
      window.location.reload(true)
      window.location.assign(`/${params.lojaId}/vidros`);
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
      await axios.delete(`/api/${params.lojaId}/vidros/${params.vidroId}`);
      window.location.reload(true)
      window.location.assign(`/${params.lojaId}/vidros`);
      toast.success('Vidro deletado.');
    } catch (error) {
      toast.error('Algo deu errado.');
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
        <form onSubmit={(e) => handleSubmit(e)} className='pt-3 pb-3'>
          <div className="flex flex-col self-start gap-3">
          <div className="grid grid-cols-3 gap-x-9 gap-y-5">
            <div className="flex flex-col">
              <label htmlFor="nome" className="text-[17px] pb-1">Nome: </label>
              <input type="text" id="nome" placeholder="Tosador X" className="text-[16px] max-w-[250px]" value={data?.nome ?? ''} onChange={(e) => setData((prev) => {
                return { ...prev, nome: e.target.value }
              })} />
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="area" className="text-[17px] pb-1">Área (m²):</label>
              <input type="number" id="area" name="area" step="0.0001" min="0" pattern="^\d+(\.\d{1,4})?$" title="Informe uma área válida" placeholder="1.50" required className="text-[16px] max-w-[250px]"
              value={data?.area ?? ''} onChange={(e) => setData((prev) => {
                return { ...prev, area: e.target.value }
              })} />
            </div>

            <div className="flex flex-col">
              <label htmlFor="preco" className="text-[17px] pb-1">Preço:</label>
              <input type="number" id="preco" name="preco" step="0.01" min="0" pattern="^\d+(.\d{1,2})?$" title="Informe um preço válido" placeholder="10.50" required className="text-[16px] max-w-[250px]"
              value={data?.preco ?? ''} onChange={(e) => setData((prev) => {
                return { ...prev, preco: e.target.value }
              })} />
            </div>

              <div className="flex flex-col">
                <label htmlFor="estoque" className="text-[17px] pb-1">Estoque:</label>
                <input type="number" id="estoque" name="estoque" min="0" title="Informe um número válido" placeholder="8" required className="text-[16px] max-w-[250px]"
                value={data?.estoque ?? 0} onChange={(e) => setData((prev) => {
                  return { ...prev, estoque: e.target.value }
                })} />
              </div>
              
            </div>
          </div>
          <button type="submit" className={"mt-5 self-start px-2.5 py-1.5 mb-7 text-lg text-white font-semibold rounded-md transition " + ((loading) ? "loading" : 'bg-black hover:text-pink-200')} >{action}</button>
        </form>
      </div>
    </>
  )
}