'use client'

import { useState, useTransition } from 'react'
import {
  IconUsers,
  IconClock,
  IconUser,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { deleteClassById } from '@/http/classes/delete'
import { Button } from '@/components/ui/button'
import { formatAgeRange, formatSchedule } from '@/lib/utils'
import Link from 'next/link'

type ClassCardProps = {
  id: string
  title: string
  ageRange: {
    min: number
    max: number | null
  }
  instructor: string
  studentsCount: number
  schedule: {
    dayOfWeek: string
    time: string
  }[]
  totalStudents: number
}

export function ClassCard(props: ClassCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const classId = props.id

  const ageRange = formatAgeRange(props.ageRange.min, props.ageRange.max)
  const schedule = formatSchedule(props.schedule)

  const handleDeleteClassById = async () => {
    startTransition(async () => {
      const response = await deleteClassById(classId)

      if (response.status === 'success') {
        toast.success(response.message)
        setIsOpen(false)
      } else {
        toast.error(response.message)
      }
    })
  }

  return (
    <Card className='@container/card cursor-pointer hover:shadow-lg transition-shadow mb-4'>
      <CardHeader className='flex justify-between items-start'>
        <Link href={`/dashboard/classes/${classId}/details`} className='w-full'>
          <div className='space-y-1'>
            <CardTitle className='text-xl font-semibold'>
              {props.title}
            </CardTitle>
            <span className='text-sm text-neutral-500 font-poppins'>
              Faixa etária: {ageRange}
            </span>
          </div>
        </Link>

        <div className='flex items-center gap-3'>
          <Link href={`/dashboard/classes/${classId}/edit`}>
            <IconPencil className='size-5 cursor-pointer text-muted-foreground hover:text-primary transition-colors' />
          </Link>

          <AlertDialog open={isOpen} onOpenChange={setIsOpen} key={classId}>
            <AlertDialogTrigger>
              <IconTrash className='size-5 cursor-pointer text-muted-foreground hover:text-destructive transition-colors' />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-xl font-poppins font-semibold tracking-[-0.0002em]'>
                  Deletar aluno
                </AlertDialogTitle>
                <AlertDialogDescription className='font-poppins text-sm'>
                  Você realmente deseja deletar esta turma?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  disabled={isPending}
                  className='cursor-pointer'
                >
                  Cancelar
                </AlertDialogCancel>
                <Button
                  disabled={isPending}
                  onClick={handleDeleteClassById}
                  className='bg-red-700 hover:bg-red-700/90 transition-colors cursor-pointer'
                >
                  <IconTrash className='size-5' />
                  {isPending ? 'Deletando...' : 'Deletar'}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>

      <Link href={`/dashboard/classes/${classId}/details`}>
        <CardContent className='grid gap-2 text-sm'>
          <div className='flex items-center gap-2'>
            <IconUser className='size-4' />
            <span className='text-sm font-poppins'>
              Professor: {props.instructor}
            </span>
          </div>

          <div className='flex items-center gap-2'>
            <IconUsers className='size-4' />
            <span className='text-sm font-poppins'>
              Alunos: {props.totalStudents}
            </span>
          </div>

          <div className='flex items-center gap-2'>
            <IconClock className='size-4' />
            <span className='text-sm font-poppins'>{schedule}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
