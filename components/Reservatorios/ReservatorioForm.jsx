"use client"

import { useParams } from "next/navigation";
import { useState } from "react"
import { toast } from "react-hot-toast";

import axios from "axios";
import { Trash } from "lucide-react"

import AlertModal from '../AlertModal'

export default function CategoriaForm({ empresas, initialData }) {
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(initialData ? initialData : { nome: '', descricao: '', chave: '' });

  const title = initialData ? "Editar Categoria" : "Criar Categoria";
  const description = initialData ? "Modifique ou exclua a Categoria" : "Adicione uma nova Categoria";
  const toastMessage = initialData ? "Categoria atualizada." : "Categoria criada.";
  const action = initialData ? "Salvar mudanças" : "Criar Categoria";

  const handleSubmit =  async (e) => {
    e.preventDefault()
    if (!data?.descricao || !data?.nome) { 
      return toast.error("Preencha todas as informações antes");
    }
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.lojaId}/categorias/${params.categoriaId}`, data);
      } else {
        await axios.post(`/api/${params.lojaId}/categorias`, data);
      }
      window.location.reload(true)
      window.location.assign(`/${params.lojaId}/categorias`);
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
      await axios.delete(`/api/${params.lojaId}/categorias/${params.categoriaId}`);
      window.location.reload(true)
      window.location.assign(`/${params.lojaId}/categorias`);
      toast.success('Categoria deletada.');
    } catch (error) {
      toast.error('Remova todos os produtos da categoria antes.');
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
          <div className="flex flex-col gap-3 w-[250px]">
            <div className="flex flex-col">
              <label htmlFor="nome" className="text-[17px] pb-1">Nome da Categoria: </label>
              <input type="text" id="nome" placeholder="Colônias Traty Vet" className="text-[16px]" value={data?.nome ? data.nome : ''} onChange={(e) => setData((prev) => {
                return { ...prev, nome: e.target.value }
              })} />
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-2 w-[250px]">
            <div className="flex flex-col">
              <label htmlFor="descricao" className="text-[17px] pb-1">Descrição da categoria: </label>
              <textarea id="descricao" placeholder="As melhores colônias para pets da Traty Vet." spellCheck='false' className="text-[16px]" value={data?.descricao ? data.descricao : ''} onChange={(e) => setData((prev) => {
                return { ...prev, descricao: e.target.value }
              })} />
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-2 w-[250px]">
            <div className="flex flex-col">
              <label htmlFor="chave" className="text-[17px] pb-1">Palavra chave: </label>
              <input type="text" id="chave" placeholder="colônia" className="text-[16px]" value={data?.chave ?? ''} onChange={(e) => setData((prev) => {
                return { ...prev, chave: e.target.value }
              })} />
            </div>
          </div>
          <div className="flex flex-col">
              <label htmlFor="empresaId" className="text-[17px] pt-2.5 pb-0.5">Empresa: </label>
                <select name="empresaId" id="empresaId" disabled={loading} value={data?.empresaId ? data.empresaId : ''} onChange={(e) => setData((prev) => {
                  return { ...prev, empresaId: e.target.value }
                })}>
                  <option value="" disabled>Selecione uma Empresa</option>
                  {empresas.map(empresa => {
                    return (
                      <option key={empresa.id} value={empresa.id}>{empresa.nome}</option>
                    )
                  })}
                </select>
              </div>
          <button type="submit" className={"mt-5 px-2.5 py-1.5 text-lg text-white font-semibold rounded-md transition " + ((loading) ? "loading" : 'bg-black hover:text-pink-200')} >{action}</button>
        </form>
      </div>
    </>
  )
}