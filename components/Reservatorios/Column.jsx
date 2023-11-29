"use client"

import CellAction from './CellAction'

export const columns = [
  {
    accessorKey: "nome",
    header: "Nome",
    cell: ({ row }) => {
      return (
        <p style={{fontWeight: 500}}>{row.original.nome}</p>
      )
    }
  },
  {
    accessorKey: "descricao",
    header: "Descrição"
  },
  {
    accessorKey: "empresa",
    header: "Empresa",
  },
  {
    accessorKey: "createdAt",
    header: "Data",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
