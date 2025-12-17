'use client'

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
import { Button } from '@/components/ui/button'
import { promoteStudentToInstructor } from '@/http/students/promote'
import { IconUserCheck, IconUserUp } from '@tabler/icons-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

export function PromoteStudentToInstructorDialog({
  studentId,
  isPromoted,
}: {
  studentId: string
  isPromoted: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handlePromoteStudentToInstructor = async () => {
    startTransition(async () => {
      const response = await promoteStudentToInstructor(studentId)

      if (response.status === 'success') {
        toast.success(response.message)
        setIsOpen(false)
      } else {
        toast.error(response.message)
      }
    })
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          asChild
          className='bg-morimitsu-red text-white  hover:bg-morimitsu-red/90 py-2 px-3 gap-2 cursor-pointer'
        >
          <div>
            {isPromoted ? (
              <IconUserCheck className='size-5' />
            ) : (
              <IconUserUp className='size-5' />
            )}

            <span className='font-poppins font-medium'>
              {isPromoted ? 'Instrutor' : 'Promovido à instrutor'}
            </span>
          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-xl font-poppins font-semibold tracking-[-0.0002em]'>
            Promover aluno à professor
          </AlertDialogTitle>
          <AlertDialogDescription className='font-poppins text-sm'>
            Você realmente deseja promover este aluno à professor?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} className='cursor-pointer'>
            Cancelar
          </AlertDialogCancel>
          <Button
            onClick={handlePromoteStudentToInstructor}
            className='bg-black hover:bg-black/90 transition-colors cursor-pointer'
          >
            <IconUserUp className='size-5' />
            {isPending ? 'Promovendo...' : 'Promover à professor'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
