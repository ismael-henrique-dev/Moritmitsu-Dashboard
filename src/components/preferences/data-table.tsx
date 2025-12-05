'use client'

import * as React from 'react'

import { type UniqueIdentifier } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { IconPencil } from '@tabler/icons-react'
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
import { preferenceSchema } from '@/validators/preferences'
import { beltToPtBr, formatAgeRangeForDataTable } from '@/lib/utils'

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
  },

  {
    id: 'actions',
    header: 'Ações',
    cell: () => (
      <Button size='icon' variant='outline'>
        <IconPencil className='size-4' />
      </Button>
    ),
  },
]

export async function PreferencesDataTable({
  data: initialData,
}: {
  data: z.infer<typeof preferenceSchema>[]
}) {
  const [data] = React.useState(() => initialData)
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
                    // se for a coluna Turma, duplica o espaço
                    className='font-semibold py-4 pl-6'
                    colSpan={header.column.id === 'class' ? 2 : header.colSpan}
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
        <TableBody className='**:data-[slot=table-cell]:first:w-8'>
          {table.getRowModel().rows?.length ? (
            <SortableContext
              items={dataIds}
              strategy={verticalListSortingStrategy}
            >
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className='relative z-0 data-[dragging=true]:opacity-80 cursor-pointer'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      colSpan={cell.column.id === 'id' ? 2 : 1}
                      className='py-4 pl-6'
                    >
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
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                Nenhum resultado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
