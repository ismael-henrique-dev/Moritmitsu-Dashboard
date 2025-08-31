import {
  IconUsers,
  IconClock,
  IconUser,
  IconPencil,
  IconTrash,
  IconActivity,
} from '@tabler/icons-react'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

const aluno = {
  id: '1',
  name: 'João Silva',
  avatar: 'https://i.pravatar.cc/150?img=3',
  classTitle: 'Turma Kids',
  belt: 'Azul',
  lastAttendance: '2025-08-27',
  status: 'Ativo',
}

type StudentCardProps = {
  aluno: {
    id: string
    name: string
    avatar: string
    classTitle: string
    belt: string
    lastAttendance: string
    status: string
  }
}

export function StudentCard({ aluno }: StudentCardProps) {
  return (
    <Link href='#' className='mb-4'>
      <Card className='@container/card hover:shadow-xl'>
        <CardHeader className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-12 w-12 rounded-lg grayscale'>
              <AvatarImage src='' alt='Ismael Henrique' />
              <AvatarFallback className='size-12 rounded-full bg-zinc-800 text-white text-lg'>
                IH
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <CardTitle className='lg:text-xl text-xl font-semibold tabular-nums'>
                {aluno.name}
              </CardTitle>
              <span className='text-sm text-muted-foreground'>
                Turma: Sub-18
              </span>
            </div>
          </div>
          <CardAction>
            <Badge variant='secondary' className='h-6 text-sm py-3'>
              <IconActivity className='size-6 text-sm' />
              <span className='text-sm font-semibold'>46 treino(s)</span>
            </Badge>
          </CardAction>
        </CardHeader>

        {/* Content */}
        <CardContent className='flex items-center justify-between gap-4 px-6'>
          <div className='flex flex-col gap-1 text-sm text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <span className='font-semibold'>Graduação:</span>
              <span>Faixa {aluno.belt} - 2º Grau</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-semibold'>Última presença:</span>
              <span>{aluno.lastAttendance}</span>
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
  )
}
