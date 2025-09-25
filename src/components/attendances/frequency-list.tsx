'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from '@/components/ui/card'
import {
  IconTrash,
  IconPencil,
  IconUsers,
  IconClipboardCheck,
  IconClock,
} from '@tabler/icons-react'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

// simulação de dados de frequências
const frequencias = Array.from({ length: 35 }, (_, i) => ({
  id: String(i + 1),
  turma: i % 2 === 0 ? 'Turma Kids' : 'Turma Adulto',
  data: `2025-08-${(i % 30) + 1} às 19:00`,
  presentes: Math.floor(Math.random() * 15) + 5,
  ausentes: Math.floor(Math.random() * 5),
}))

type AttendancesListProps = {
  data: {
    id: string
    class: string
    date: string
    instructor: string
  }[]
}

export function FrequencyList() {
  const [page, setPage] = useState(1)
  const perPage = 12

  const totalPages = Math.ceil(frequencias.length / perPage)
  const items = useMemo(
    () => frequencias.slice((page - 1) * perPage, page * perPage),
    [page]
  )

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {items.map((freq) => (
        <Link key={freq.id} href='#' className='mb-4'>
          <Card className='@container/card hover:shadow-xl'>
            <CardHeader className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <span className='h-12 w-12 rounded-lg grayscale'>
                  <div className='size-12 flex justify-center items-center rounded-full bg-zinc-800 text-white text-lg'>
                    <IconClipboardCheck />
                  </div>
                </span>
                <div className='flex flex-col'>
                  <CardTitle className='lg:text-xl text-xl font-semibold tabular-nums'>
                    {freq.turma}
                  </CardTitle>

                  <div className='flex items-center gap-2'>
                    <IconClock className='size-4 text-muted-foreground' />
                    <span className='text-sm text-muted-foreground'>
                      {freq.data}
                    </span>
                  </div>
                  {/* <span className='text-sm text-muted-foreground'>
                    {freq.data}
                  </span> */}
                </div>
              </div>
              <CardAction>
                <Badge variant='secondary' className='h-6 text-sm py-3'>
                  <IconUsers className='size-6 text-sm' />
                  {/* <span className='text-sm font-semibold'>46 alunos(s)</span> */}
                  <span>
                    {freq.ausentes} de {freq.presentes}
                  </span>
                </Badge>
              </CardAction>
            </CardHeader>

            {/* Content */}
            <CardContent className='flex items-center justify-between gap-4 px-6'>
              <div className='flex flex-col gap-1 text-sm text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Professor:</span>
                  <span>Saulo Bezerra</span>
                </div>
              </div>

              {/* Ações com tooltip */}
              <div className='flex gap-2'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size='icon' variant='outline'>
                      <IconPencil className='size-4' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Editar</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size='icon' variant='destructive'>
                      <IconTrash className='size-4' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Excluir</TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
