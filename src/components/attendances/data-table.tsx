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
import { formatDateBR } from '@/lib/utils'
import { AttendancesTableSkeleton } from '../ui/skeletons'

export const attendanceSchema = z.object({
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

export type Attendance = z.infer<typeof attendanceSchema>

const columns: ColumnDef<z.infer<typeof attendanceSchema>>[] = [
  {
    accessorKey: 'class',
    header: 'Turma',
    cell: ({ row }) => <div className='w-[60%]'>{row.original.class.name}</div>,
  },

  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row }) => {
      return (
        <div className='w-32'>{formatDateBR(row.original.session_date)}</div>
      )
    },
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
      <Link
        href={`/dashboard/attendances/${row.original.id}/edit?class=${row.original.id}&date=${row.original.session_date}`}
      >
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
  data: Attendance[]
}) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setIsLoading(true)

    const id = setTimeout(() => {
      setData(initialData)
      setIsLoading(false)
    }, 0)

    return () => clearTimeout(id)
  }, [initialData])

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

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
    },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  if (isLoading) {
    return <AttendancesTableSkeleton />
  }

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
