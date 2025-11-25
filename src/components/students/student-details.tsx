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
  IconAward,
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
import { StudentResult } from '@/lib/definitions'
import { beltToPtBr, getUserInitials } from '@/lib/utils'
import { PromoteStudentToInstructor } from './promote-student'

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
  student: StudentResult
}

export function StudentDetails(props: StudentDetailsProps) {
  const [isPending, startTransition] = useTransition()
  const { push } = useRouter()
  const studentId = props.student.id
  const belt = beltToPtBr(props.student.belt)

  function formatPhone(phone: string) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  function formatCPF(cpf: string): string {
    const cleaned = cpf.replace(/\D/g, '') // remove tudo que não for número

    return cleaned
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{2}).*/, '$1.$2.$3-$4')
  }

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
              {getUserInitials(props.student.personal_info.full_name)}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <CardTitle className='lg:text-2xl text-xl font-semibold tabular-nums'>
              {props.student.personal_info.full_name}

              {props.student.alias && `(${props.student.alias})`}
            </CardTitle>
            <span className='text-sm text-muted-foreground'>
              {props.student.email}
            </span>
          </div>
        </div>
        <CardAction>
          <Badge variant='outline' className='h-6 text-sm'>
            <IconActivity className='size-6 text-sm' />
            <span className='text-sm font-semibold'>
              {props.student.total_frequency} treino(s)
            </span>
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className='grid lg:grid-cols-2 gap-x-8 gap-y-4 text-sm'>
          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>CPF:</span>
            <span>{formatCPF(props.student.personal_info.cpf)}</span>
          </div>

          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>Data de Nascimento:</span>
            <span>
              {new Date(
                props.student.personal_info.date_of_birth
              ).toLocaleDateString('pt-BR')}
            </span>
          </div>

          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>Telefone:</span>
            <span>
              {formatPhone(props.student.personal_info.student_phone)}
            </span>
          </div>

          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>Endereço:</span>
            <span>{props.student.personal_info.address}</span>
          </div>

          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>Responsável:</span>
            <span>{props.student.personal_info.parent_name}</span>
          </div>

          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>Telfone do responsável:</span>
            <span>{formatPhone(props.student.personal_info.parent_phone)}</span>
          </div>

          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>Matrícula:</span>
            <span>{props.student.ifce_enrollment}</span>
          </div>
        </div>

        {/* Componente da Faixa */}
        <BeltProgress
          belt={`Faixa ${belt}`}
          degree={props.student.grade}
          currentClasses={props.student.current_frequency}
          requiredClasses={props.student.total_frequency}
        />
      </CardContent>

      <CardFooter className='flex w-full justify-between items-center'>
        <CardAction className='flex gap-3'>
          <Button className='bg-morimitsu-red text-primary-foreground hover:bg-morimitsu-red/90'>
            <IconAward />
            <span>Graduar Aluno</span>
          </Button>
          <PromoteStudentToInstructor />
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
