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
import { Button } from '../ui/button'
import { IconUserUp } from '@tabler/icons-react'

export function PromoteStudentToInstructor() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          asChild
          className='bg-morimitsu-red text-white  hover:bg-morimitsu-red/90 py-2 px-3 gap-2 cursor-pointer'
        >
          <div>
            <IconUserUp className='size-5' />
            <span className='font-poppins font-medium'>
              Promover à professor
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
          <AlertDialogCancel className='cursor-pointer'>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction className='bg-black hover:bg-black/90 transition-colors cursor-pointer'>
            <IconUserUp className='size-5' />
            Promover à professor
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
