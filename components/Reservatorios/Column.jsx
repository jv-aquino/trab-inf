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
    accessorKey: "volumeTotal",
    header: "Volume Total (L)"
  },
  {
    accessorKey: "hidrogenio",
    header: "Volume de Hidrogênio (L)",
  },
  {
    accessorKey: "combustivel",
    header: "Volume de Combustível (L)",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
