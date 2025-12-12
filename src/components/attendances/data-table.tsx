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
import Link from 'next/link'

export const schema = z.object({
  id: z.string(),
  session_date: z.string(),
  class: z.object({
    name: z.string(),
    _count: z.object({
      students: z.number(),
    }),
  }),
  instructor: z.object({
    username: z.string(),
  }),
})

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: 'class',
    header: 'Turma',
    cell: ({ row }) => <div className='w-[60%]'>{row.original.class.name}</div>,
  },

  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row }) => <div className='w-32'>{row.original.session_date}</div>,
  },
  {
    accessorKey: 'class._count.students',
    header: 'Alunos Presentes',
  },
  {
    accessorKey: 'instructor.username',
    header: 'Professor',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <Link href={`/dashboard/attendances/${row.original.id}/edit`}>
        <div className='flex gap-3'>
          <Button size='icon' variant='outline' className='cursor-pointer'>
            <IconPencil className='size-4' />
          </Button>
        </div>
      </Link>
    ),
  },
]

export function AttendancesTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[]
}) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
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
    getRowId: (row) => row.id,
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
    <div className='overflow-hidden rounded-lg border lg:block hidden'>
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
                      colSpan={cell.column.id === 'class' ? 2 : 1}
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
