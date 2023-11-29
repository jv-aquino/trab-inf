"use client"

import CellAction from './CellAction'

export const columns = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "area",
    header: "Área (m²)",
  },
  {
    accessorKey: "preco",
    header: "Preço (R$)",
  },
  {
    accessorKey: "estoque",
    header: "Estoque",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
