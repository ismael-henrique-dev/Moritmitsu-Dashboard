'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { IconCircleMinus } from '@tabler/icons-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export function EnrolledStudentItem() {
  return (
    <Card className='p-0'>
      <CardContent className='flex justify-between items-center p-3'>
        <div className='flex items-center gap-2'>
          <Avatar className='h-9 w-9 rounded-lg grayscale'>
            <AvatarFallback className='rounded-full bg-zinc-800 text-white text-base font-medium font-poppins'>
              IH
            </AvatarFallback>
          </Avatar>
          <span className='text-base font-medium font-poppins'>
            Nome do aluno
          </span>
        </div>

        <AlertDialog>
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
              <AlertDialogCancel className='cursor-pointer'>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction className='bg-red-700 hover:bg-red-700/90 transition-colors cursor-pointer'>
                <IconCircleMinus className='size-5' />
                Desenturmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
