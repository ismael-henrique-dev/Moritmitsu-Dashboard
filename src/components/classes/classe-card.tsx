'use client'

import {
  IconUsers,
  IconClock,
  IconUser,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { deleteClassById } from '@/http/classes/delete'
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
import { useState, useTransition } from 'react'
import { Button } from '../ui/button'

type ClassCardProps = {
  id: string
  title: string
  ageRange: {
    min: number
    max: number | null
  }
  instructor: string
  studentsCount: number
  schedule: string
}

export function ClassCard(props: ClassCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const classId = props.id

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
              Faixa etária: {props.ageRange.min} a {props.ageRange.max} anos
            </span>
          </div>
        </Link>

        <div className='flex items-center gap-3'>
          <Link href={`/dashboard/classes/${classId}/edit`}>
            <IconPencil className='size-5 cursor-pointer text-muted-foreground hover:text-primary transition-colors' />
          </Link>

          <AlertDialog open={isOpen} onOpenChange={setIsOpen} key={classId}>
            <AlertDialogTrigger>
              <IconTrash
                className='size-5 cursor-pointer text-muted-foreground hover:text-destructive transition-colors'
                // onClick={() => setIsOpen(true)}
              />
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
                {/* <AlertDialogAction
                  asChild
                  disabled={isPending}
                  className='bg-red-700 hover:bg-red-700/90 transition-colors cursor-pointer'
                > */}
                <Button
                  disabled={isPending}
                  onClick={handleDeleteClassById}
                  className='bg-red-700 hover:bg-red-700/90 transition-colors cursor-pointer'
                >
                  <IconTrash className='size-5' />
                  {isPending ? 'Deletando...' : 'Deletar'}
                </Button>
                {/* </AlertDialogAction> */}
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
            <span className='text-sm font-poppins'>Alunos: 12</span>
          </div>

          <div className='flex items-center gap-2'>
            <IconClock className='size-4' />
            <span className='text-sm font-poppins'>{props.schedule}</span>
            {/* <span>Seg, Qua, Sex - 18h às 19h</span> */}
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
