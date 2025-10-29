import {
  IconUsers,
  IconClock,
  IconUser,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'

type ClassCardProps = {
  id: string
  title: string
  ageRange: {
    min: number
    max: number | null
  }
  professor: string
  studentsCount: number
  schedules: { day: string; hour: string }[]
}

export function ClassCard() {
  return (
    <Link href='/dashboard/classes/1234/details'className='mb-4'>
      <Card className='@container/card cursor-pointer hover:shadow-lg transition-shadow mb-4'>
        <CardHeader className='flex justify-between items-start'>
          <div>
            <CardTitle className='text-xl font-semibold'>Turma Baby</CardTitle>
            <span className='text-sm text-muted-foreground'>
              Faixa etária: 4 a 7 anos
            </span>
          </div>

          <div className='flex items-center gap-3'>
            <Tooltip>
              <TooltipTrigger>
                <Link href='/edit'>
                  <IconPencil className='size-5 cursor-pointer text-muted-foreground hover:text-primary transition-colors' />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Editar turma</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <IconTrash className='size-5 cursor-pointer text-muted-foreground hover:text-destructive transition-colors' />
              </TooltipTrigger>
              <TooltipContent>
                <p>Excluir turma</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>

        <CardContent className='grid gap-2 text-sm'>
          <div className='flex items-center gap-2'>
            <IconUser className='size-4 text-muted-foreground' />
            <span>Professor: João Silva</span>
          </div>

          <div className='flex items-center gap-2'>
            <IconUsers className='size-4 text-muted-foreground' />
            <span>Alunos: 18</span>
          </div>

          <div className='flex items-center gap-2'>
            <IconClock className='size-4 text-muted-foreground' />
            <span>Seg, Qua, Sex - 18h às 19h</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
