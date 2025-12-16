'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { IconCircleMinus } from '@tabler/icons-react'
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
import { getUserInitials } from '@/lib/utils'
import { useState, useTransition } from 'react'
import { unerollStudentById } from '@/http/students/uneroll'
import { toast } from 'sonner'

type EnrolledStudentItemProps = {
  name: string
  studentId: string
  classId: string
}

export function EnrolledStudentItem({
  name,
  studentId,
  classId,
}: EnrolledStudentItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const initials = getUserInitials(name)

  const handleDeleteClassById = async () => {
    startTransition(async () => {
      const response = await unerollStudentById(studentId, classId)

      if (response.status === 'success') {
        toast.success(response.message)
        setIsOpen(false)
      } else {
        toast.error(response.message)
      }
    })
  }

  return (
    <Card className='p-0'>
      <CardContent className='flex justify-between items-center p-3'>
        <div className='flex items-center gap-2'>
          <Avatar className='h-9 w-9 rounded-lg grayscale'>
            <AvatarFallback className='rounded-full bg-zinc-800 text-white text-base font-medium font-poppins'>
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className='text-base font-medium font-poppins'>{name}</span>
        </div>

        <AlertDialog open={isOpen} onOpenChange={setIsOpen} key={studentId}>
          <AlertDialogTrigger asChild>
            <Button
              asChild
              className='bg-red-700 text-white hover:bg-red-700/90 py-2 px-3 gap-2 cursor-pointer'
            >
              <div>
                <IconCircleMinus className='size-5' />
                <span className='font-poppins font-medium'>Desenturmar</span>
              </div>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-xl font-poppins font-semibold tracking-[-0.0002em]'>
                Desenturmar aluno
              </AlertDialogTitle>
              <AlertDialogDescription className='font-poppins text-sm'>
                Você realmente deseja desenturmar este aluno?
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
                <IconCircleMinus className='size-5' />
                {isPending ? 'Desenturmando...' : 'Desenturmar'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
