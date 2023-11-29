"use client"

import DataTable from '../DataTable'
import ApiList from '../ApiList'
import { columns } from './Column'

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation";

export default function CategoryClient({ data }) {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="flex flex-col px-5">
      <div className="flex items-center justify-between pt-4 pb-3 separator">
        <div className="heading">
          <h2>Categorias ({data.length})</h2>
          <p>Administre as categorias da sua loja</p>
        </div>
        <button className="bg-black text-white text-lg rounded-md flex items-center px-2 py-1.5"
        onClick={() => router.push(`/${params.lojaId}/categorias/new`)}><Plus className="pr-0.5" /> Add Categoria</button>
      </div>
      <DataTable columns={columns} data={data} searchKey="nome" field="nome" />
      <div className="heading pb-3 separator">
        <h2>API</h2>
        <p>Links da API de categorias</p>
      </div>
      <ApiList entityName="categorias" entityIdName="categoriaId" />
    </div>
  )
}