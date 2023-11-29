"use client"

import { useParams, useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "react-hot-toast";

import axios from "axios";
import { Trash } from "lucide-react"
import { useOrigin } from '@/hooks/use-origin'

import AlertModal from '../AlertModal'
import ApiAlert from '../ApiAlert'

export default function SettingsForm({ initialData }) {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const origin = useOrigin()

  const [data, setData] = useState(initialData);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) { return }

    setLoading(true);
    try {
      await axios.patch(`/api/lojas/${params.lojaId}`, data);
      location.reload(true);
      toast.success("Loja atualizada.")
    } catch (err) {
      toast.error("Algo deu errado");
    } finally {
      setLoading(false)
    }
  }
  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/lojas/${params.lojaId}`)
      
      setOpen(false);
      window.location.assign("/")
      window.location.reload(true);
      toast.success("Loja excluída.")

    } catch (e) {
      toast.error("Remova todos os produtos e categorias da loja antes")
    } finally {
      setLoading(false);
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)}
      onConfirm={handleDelete} loading={loading}/>
      <div className="flex flex-col">
        <div className='flex items-center justify-between px-2 pb-3 separator'>
          <div className="heading">
            <h2>Configurações</h2>
            <p>Administrar preferências da loja</p>
          </div>
          <button className={"text-white rounded-md p-2 w-fit h-fit " + ((loading) ? "loading" : 'bg-red-500')}
          onClick={() => setOpen(true)}>
            <Trash className="h-5 w-5"/>
          </button>
        </div>
        <form onSubmit={handleSubmit} className='pt-3 pb-4 separator'>
          <div className="flex flex-col pb-4">
            <label htmlFor="nome">Nome: </label>
            <input type="text" id="nome" placeholder="WLG Distribuidor Pet" value={data.nome} onChange={(e) => setData((prev) => {
              return { ...prev, nome: e.target.value }
            })} />
          </div>
          <button type="submit" className={"px-2.5 py-1.5 text-lg text-white font-semibold rounded-md " + ((loading) ? "loading" : 'bg-black')} >Salvar mudanças</button>
        </form>
      </div>
      <div className="mt-4"></div>
      <ApiAlert title='NEXT_PUBLIC_API_URL' description={`${origin}/api/${params.lojaId}`} variant="public" />
    </>
  )
}