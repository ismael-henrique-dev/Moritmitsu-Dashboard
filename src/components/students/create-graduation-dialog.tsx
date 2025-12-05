import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { IconAward } from '@tabler/icons-react'
import { beltToPtBr, getUserInitials } from '@/lib/utils'
import { CreateGraduationForm } from '../forms/create-graduation'

type StudentData = {
  id: string
  fullName: string
  belt: Belt
  grade: number
}

type CreateGraduationDialogProps = {
  data: StudentData
}

export function CreateGraduationDialog({ data }: CreateGraduationDialogProps) {
  const { belt: enBelt, fullName, id, grade } = data

  const belt = beltToPtBr(enBelt)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          asChild
          className='bg-morimitsu-red text-white  hover:bg-morimitsu-red/90 py-2 px-3 gap-2 cursor-pointer'
        >
          <div>
            <IconAward className='size-5' />
            <span className='font-poppins font-medium'>Graduar Aluno</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-xl font-poppins font-semibold tracking-[-0.0002em]'>
            Graduar Aluno
          </DialogTitle>
        </DialogHeader>

        <div className='flex-col flex ga-1 items-center justify-center'>
          <Avatar className='h-10 w-10 rounded-lg grayscale'>
            <AvatarImage src='' alt={'asas'} />
            <AvatarFallback className='size-10 rounded-full bg-black text-white font-medium font-poppins'>
              {getUserInitials(fullName)}
            </AvatarFallback>
          </Avatar>
          <h2 className='font-medium font-poppins'>{fullName}</h2>
          <span className='font-poppins text-neutral-500 text-sm'>
            Faixa atual: {belt} - Grau {grade}
          </span>
        </div>
        {/* Formulario aqui */}
        <CreateGraduationForm studentId={id} />
      </DialogContent>
    </Dialog>
  )
}
