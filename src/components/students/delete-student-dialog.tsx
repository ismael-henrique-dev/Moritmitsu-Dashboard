'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
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
import { deleteStudentById } from '@/http/students/delete'
import { IconTrash } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'

export function DeleteStudentDialog({ studentId }: { studentId: string }) {
  const [isPending, startTransition] = useTransition()
  const { push } = useRouter()

  const handleDeleteStudentById = async () => {
    startTransition(async () => {
      const response = await deleteStudentById(studentId)

      if (response.status === 'success') {
        toast.success(response.message)
        push('/dashboard/students')
      } else {
        toast.error(response.message)
      }
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <IconTrash className='ml-auto size-6 cursor-pointer' />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-xl font-poppins font-semibold tracking-[-0.0002em]'>
            Deletar aluno
          </AlertDialogTitle>
          <AlertDialogDescription className='font-poppins text-sm'>
            Você realmente deseja deletar este aluno?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} className='cursor-pointer'>
            Cancelar
          </AlertDialogCancel>

          <Button
            disabled={isPending}
            onClick={handleDeleteStudentById}
            className='bg-red-700 hover:bg-red-700/90 transition-colors cursor-pointer'
          >
            <IconTrash className='size-5' />

            {isPending ? 'Deletando...' : 'Deletar'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
