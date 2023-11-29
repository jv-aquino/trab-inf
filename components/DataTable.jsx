"use client"

import { useState } from "react"

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function DataTable({ columns, data, searchKey, field }) {
  const [columnFilters, setColumnFilters] = useState([])

  const table = useReactTable({
    data,
    columns,
    searchKey,
    field,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <div>
      <div className="flex items-center pt-5 pb-2">
        <input
          placeholder={"Pesquise pelo " + searchKey}
          value={(table.getColumn(field)?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn(field)?.setFilterValue(event.target.value)
          }
          className="w-sm px-2 py-[7px] border-2 border-neutral-300 rounded-md placeholder:text-zinc-500"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-2 py-3">
        <button type="button" className="pagination"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}>
          Anterior
        </button>

        <button type="button" className="pagination"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}>
          Próximo
        </button>
      
      </div>
    </div>
  )
}
