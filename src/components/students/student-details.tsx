'use client'

import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '../ui/button'
import {
  IconActivity,
  IconCirclePlusFilled,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react'
import { Progress } from '@/components/ui/progress'
import { Badge } from '../ui/badge'
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
import { useTransition } from 'react'
import { deleteStudentById } from '@/http/students/delete'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Exemplo de componente para exibir a faixa
function BeltProgress({
  belt,
  degree,
  currentClasses,
  requiredClasses,
}: {
  belt: string
  degree: number
  currentClasses: number
  requiredClasses: number
}) {
  const progress = Math.min((currentClasses / requiredClasses) * 100, 100)

  return (
    <div className='flex flex-col gap-2 w-full mt-4'>
      <div className='flex justify-between items-center'>
        <span className='font-semibold'>
          {belt} - Grau {degree}
        </span>
        <span className='text-sm text-muted-foreground'>
          {currentClasses}/{requiredClasses} treinos
        </span>
      </div>
      <Progress value={progress} className='h-3' />
    </div>
  )
}

type StudentDetailsProps = {
  id: string
}

export function StudentDetails(props: StudentDetailsProps) {
  const [isPending, startTransition] = useTransition()
  const { push } = useRouter()
  const studentId = props.id

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
    <Card className='@container/card'>
      <CardHeader className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Avatar className='h-12 w-12 rounded-lg grayscale'>
            <AvatarImage src='' alt='Ismael Henrique' />
            <AvatarFallback className='size-12 rounded-full bg-zinc-800 text-white text-lg'>
              IH
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <CardTitle className='lg:text-2xl text-xl font-semibold tabular-nums'>
              Ismael Henrique
            </CardTitle>
            <span className='text-sm text-muted-foreground'>
              Aluno ID: 123456
            </span>
          </div>
        </div>
        <CardAction>
          <Badge variant='outline' className='h-6 text-sm'>
            <IconActivity className='size-6 text-sm' />
            <span className='text-sm font-semibold'>46 treino(s)</span>
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className='grid lg:grid-cols-2 gap-x-8 gap-y-4 text-sm'>
          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>CPF:</span>
            <span>123.456.789-00</span>
          </div>

          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>Data de Nascimento:</span>
            <span>01/01/2000</span>
          </div>

          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>Telefone:</span>
            <span>(11) 98765-4321</span>
          </div>

          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>Endereço:</span>
            <span>Rua Exemplo, 123 - São Paulo/SP</span>
          </div>

          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>Graduação:</span>
            <span>Faixa Azul - 2º Grau</span>
          </div>

          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>Responsável:</span>
            <span>Maria Henrique (Mãe)</span>
          </div>
        </div>

        {/* Componente da Faixa */}
        <BeltProgress
          belt='Faixa Branca'
          degree={3}
          currentClasses={12}
          requiredClasses={30}
        />
      </CardContent>

      <CardFooter className='flex w-full justify-between items-center'>
        <CardAction>
          <Button className='bg-primary text-primary-foreground hover:bg-primary/90 w-full'>
            <IconCirclePlusFilled />
            <span>Graduar Aluno</span>
          </Button>
        </CardAction>
        <div className='flex items-center gap-3 h-10'>
          <Link href={`/dashboard/students/${studentId}/edit`}>
            <IconPencil className='ml-auto size-6 cursor-pointer' />
          </Link>

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
                  onClick={handleDeleteStudentById}
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
      </CardFooter>
    </Card>
  )
}
