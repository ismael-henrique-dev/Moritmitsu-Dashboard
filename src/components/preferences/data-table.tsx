'use client'

import * as React from 'react'

import { type UniqueIdentifier } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { IconPencil, IconCheck } from '@tabler/icons-react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { preferenceSchema } from '@/validators/preferences'
import { beltToPtBr, formatAgeRangeForDataTable } from '@/lib/utils'


export function PreferencesDataTable({
  data: initialData,
}: {
  data: z.infer<typeof preferenceSchema>[]
}) {
  const [data, setData] = React.useState(() => initialData)

  // 👉 Estado de qual linha está em edição
  const [editingRowId, setEditingRowId] = React.useState<string | null>(null)

  // 👉 Valor editado de totalTrains
  const [editingValue, setEditingValue] = React.useState<number | null>(null)

  // 👉 Colunas vêm aqui dentro para acessar os estados acima
  const columns: ColumnDef<z.infer<typeof preferenceSchema>>[] = [
    {
      accessorKey: 'category',
      header: 'Categoria',
      cell: ({ row }) => (
        <div className='2xl:w-60 w-40'>{row.original.category}</div>
      ),
    },

    {
      id: 'ageRange',
      header: 'Faixa etária',
      cell: ({ row }) => {
        const { minAge, maxAge } = row.original
        return <div>{formatAgeRangeForDataTable(minAge, maxAge)}</div>
      },
    },

    {
      accessorKey: 'belt',
      header: 'Faixa',
      cell: ({ row }) => {
        const beltPtBr = beltToPtBr(row.original.belt as Belt)
        const belt = beltPtBr.toLocaleUpperCase()
        return <div className='w-32'>{belt}</div>
      },
    },

    {
      accessorKey: 'totalTrains',
      header: 'Treinos necessários',
      cell: ({ row }) => {
        const rowId = row.original.id
        const isEditing = editingRowId === rowId

        if (isEditing) {
          return (
            <Input
              type='number'
              value={editingValue ?? row.original.totalTrains}
              onChange={(e) => setEditingValue(Number(e.target.value))}
              className='w-20 h-8'
            />
          )
        }

        return <span>{row.original.totalTrains}</span>
      },
    },

    {
      id: 'actions',
      header: 'Ações',
      cell: ({ row }) => {
        const rowId = row.original.id
        const isEditing = editingRowId === rowId

        const handleEdit = () => {
          setEditingRowId(rowId)
          setEditingValue(row.original.totalTrains)
        }

        const handleSave = () => {
          // Atualiza os dados localmente
          setData((prev) =>
            prev.map((item) =>
              item.id === rowId
                ? { ...item, totalTrains: editingValue ?? item.totalTrains }
                : item
            )
          )

          // await updatePreference(rowId, { totalTrains: editingValue })

          setEditingRowId(null)
        }

        return (
          <>
            {isEditing ? (
              <Button size='icon' variant='outline' onClick={handleSave}>
                <IconCheck className='size-4' />
              </Button>
            ) : (
              <Button size='icon' variant='outline' onClick={handleEdit}>
                <IconPencil className='size-4' />
              </Button>
            )}
          </>
        )
      },
    },
  ]


  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 100,
  })

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className='overflow-hidden rounded-lg border xl:block hidden'>
      <Table>
        <TableHeader className='sticky top-0 z-10 py-3 hover:none'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className='font-semibold py-4 pl-6'
                  >
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
            <SortableContext
              items={dataIds}
              strategy={verticalListSortingStrategy}
            >
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='py-4 pl-6'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </SortableContext>
          ) : (
            <TableRow>
              <TableCell colSpan={5} className='h-24 text-center'>
                Nenhum resultado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
