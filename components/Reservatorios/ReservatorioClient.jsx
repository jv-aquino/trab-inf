"use client"

import DataTable from '../DataTable'
import ApiList from '../ApiList'
import { columns } from './Column'

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation";

export default function ReservatorioClient({ data }) {
  const router = useRouter();
  const params = useParams();

  return (
    <div className="flex flex-col px-5">
      <div className="flex items-center justify-between pt-4 pb-3 separator">
        <div className="heading">
          <h2>Reservatórios ({data.length})</h2>
          <p>Administre os reservatórios</p>
        </div>
        <button className="bg-black text-white text-lg rounded-md flex items-center px-2 py-1.5"
        onClick={() => router.push(`/${params.lojaId}/reservatorios/new`)}><Plus className="pr-0.5" /> Add Reservatório</button>
      </div>
      <DataTable columns={columns} data={data} searchKey="nome" field="nome" />
      <div className="heading pb-3 separator">
        <h2>API</h2>
        <p>Links da API de reservatórios</p>
      </div>
      <ApiList entityName="reservatorios" entityIdName="reservatorioId" />
    </div>
  )
}