import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { IconArrowRight, IconAward, IconCake, IconX } from '@tabler/icons-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Avatar } from '../ui/avatar'

const birthdays = [
  { id: 1, name: 'Ana Lima de Souza', age: 15, birthday: '21/12' },
  { id: 2, name: 'Carlos Andrarde da Silva', age: 17, birthday: '20/12' },
  { id: 3, name: 'João Gonçalves de Araújo', age: 16, birthday: '14/12' },
  { id: 4, name: 'Marina Bastos', age: 20, birthday: '12/12' },
]

const eligibleStudents = [
  {
    id: 1,
    name: 'Pedro Henrique',
    type: 'grade',
    graduation: {
      currentGraduation: {
        belt: 'Azul',
        grade: 0,
      },
      newGraduation: { grade: 1 },
    },
  },
  {
    id: 2,
    name: 'Lucas Bezerra',
    type: 'belt',
    graduation: {
      currentGraduation: {
        belt: 'Roxa',
        grade: 4,
      },
      newGraduation: { belt: 'Marrom' },
    },
  },
]

export function Announcements() {
  return (
    <div className='space-y-4'>
      <CardHeader className='px-0'>
        <CardTitle className='lg:text-xl font-poppins'>Avisos</CardTitle>
      </CardHeader>
      <div className='grid lg:grid-cols-2 gap-4'>
        <BirthdaysCard />
        <GraduationsCard />
      </div>
    </div>
  )
}

function BirthdaysCard() {
  return (
    <Card className='@container/card lg:gap-6 gap-4 '>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <Avatar className='lg:size-10 size-8 flex justify-center items-center rounded-full bg-black text-white'>
            <IconCake className='lg:size-6 size-4' />
          </Avatar>
          <CardTitle className='lg:text-base text-sm font-poppins font-medium'>
            Aniversariantes do mês
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className='list-disc text-sm marker:text-xl lg:pl-6 pl-5'>
          {birthdays.slice(0, 3).map((student) => (
            <li key={student.id} className='h-9'>
              <div className='flex justify-between items-center'>
                <strong className='font-poppins font-medium lg:text-sm text-xs break-words'>
                  {student.name}
                </strong>
                <span className='font-poppins text-neutral-500 lg:text-sm tracking-[0.0005em] text-xs'>
                  {student.birthday} - {student.age} anos
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>

      {birthdays.length > 3 && (
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <button className='underline mt-2 cursor-pointer'>
                Ver todos
              </button>
            </DialogTrigger>
            <DialogContent showCloseButton={false} className='lg:max-w-1/3'>
              <DialogHeader className='flex flex-row items-center justify-between'>
                <DialogTitle className='text-xl font-poppins font-semibold tracking-[-0.0002em]'>
                  Aniversariantes do mês
                </DialogTitle>
                <DialogClose asChild>
                  <IconX className='size-4 cursor-pointer' />
                </DialogClose>
              </DialogHeader>
              <ul className='list-disc text-sm marker:text-xl pl-6'>
                {birthdays.slice(0, 3).map((student) => (
                  <li key={student.id} className='h-9'>
                    <div className='flex justify-between items-center'>
                      <strong className='font-poppins font-medium lg:text-sm text-xs'>
                        {student.name}
                      </strong>
                      <span className='font-poppins text-neutral-500 lg:text-sm text-xs tracking-[0.0005em]'>
                        {student.birthday} - {student.age} anos
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </DialogContent>
          </Dialog>
        </CardFooter>
      )}
    </Card>
  )
}

function GraduationsCard() {
  return (
    <Card className='@container/card'>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <Avatar className='lg:size-10 size-8 flex justify-center items-center rounded-full bg-black text-white'>
            <IconAward className='lg:size-6 size-4' />
          </Avatar>
          <CardTitle className='lg:text-base text-sm font-poppins font-medium'>
            Alunos aptos à graduação
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className='list-disc text-sm marker:text-xl lg:pl-6 pl-5'>
          {eligibleStudents.slice(0, 3).map((student) => {
            const { type, graduation } = student

            const isBelt = type === 'belt'
            const current = isBelt
              ? graduation.currentGraduation.belt
              : `Grau ${graduation.currentGraduation.grade}`
            const next = isBelt
              ? graduation.newGraduation.belt
              : `Grau ${graduation.newGraduation.grade}`

            return (
              <li key={student.id} className='h-9'>
                <div className='flex justify-between items-center'>
                  <div className='space-x-1'>
                    <strong className='font-poppins font-medium lg:text-sm text-xs'>
                      {student.name}
                    </strong>
                    {/* <span className='font-poppins text-neutral-500 lg:text-sm text-xs'>
                      (faixa {graduation.currentGraduation.belt.toLowerCase()})
                    </span> */}
                  </div>

                  <div className='flex items-center gap-1 text-neutral-500 lg:text-sm text-xs font-poppins tracking-[0.0005em]'>
                    <span>{current}</span>
                    <IconArrowRight stroke={1.5} className='lg:size-5 size-4' />
                    <span>{next}</span>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
