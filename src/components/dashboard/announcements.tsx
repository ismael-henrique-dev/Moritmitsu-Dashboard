import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IconAward, IconCake } from '@tabler/icons-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const birthdays = [
  { id: 1, name: 'Ana Lima de Souza', age: 15 },
  { id: 2, name: 'Carlos Andrarde da Silva', age: 17 },
  { id: 3, name: 'João Gonçalves de Araújo', age: 16 },
  { id: 4, name: 'Marina Bastos', age: 20 },
]

const eligibleStudents = [
  { id: 1, name: 'Pedro Henrique', currentGraduation: 'Faixa Azul' },
  { id: 2, name: 'Lucas Bezerra', currentGraduation: 'Faixa Roxa' },
  { id: 3, name: 'Fernanda Maria', currentGraduation: 'Faixa Amarela' },
  { id: 4, name: 'Beatriz Oliveira', currentGraduation: 'Faixa Laranja' },
]

export function Announcements() {
  return (
    <div className='space-y-4'>
      <CardHeader className='px-0'>
        <CardTitle className='lg:text-xl font-poppins'>Avisos</CardTitle>
      </CardHeader>
      <div className='grid lg:grid-cols-2 gap-4'>
        <Card className='@container/card'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <div className='size-10 flex justify-center items-center rounded-full bg-zinc-800 text-white'>
                <IconCake />
              </div>
              <CardTitle>Aniversariantes do mês</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className='list-disc pl-5 text-sm space-y-1'>
              {birthdays.slice(0, 3).map((aluno) => (
                <li key={aluno.id}>
                  <div className='flex justify-between items-center'>
                    <strong>{aluno.name}:</strong>
                    <span className='text-zinc-600'>
                      {aluno.age} anos -{' '}
                      {new Date(aluno.age).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            {birthdays.length > 3 && (
              <Dialog>
                <DialogTrigger asChild>
                  <button className='underline mt-2 cursor-pointer'>
                    Ver todos
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Aniversariantes do mês</DialogTitle>
                  </DialogHeader>
                  <ul className='list-disc pl-5 space-y-1'>
                    {birthdays.map((aluno) => (
                      <li key={aluno.id}>
                        {aluno.name} -{' '}
                        {new Date(aluno.age).toLocaleDateString('pt-BR')}
                      </li>
                    ))}
                  </ul>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>
        <Card className='@container/card'>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <div className='size-10 flex justify-center items-center rounded-full bg-zinc-800 text-white'>
                <IconAward />
              </div>

              <CardTitle>Alunos aptos à graduação</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className='list-disc pl-5 text-sm space-y-1'>
              {eligibleStudents.slice(0, 3).map((aluno) => (
                <li key={aluno.id}>
                  {aluno.name} ({aluno.currentGraduation})
                </li>
              ))}
            </ul>
            {eligibleStudents.length > 3 && (
              <Dialog>
                <DialogTrigger asChild>
                  <button className='underline mt-2 cursor-pointer'>
                    Ver todos
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Alunos aptos à graduação</DialogTitle>
                  </DialogHeader>
                  <ul className='list-disc pl-5 space-y-1'>
                    {eligibleStudents.map((aluno) => (
                      <li key={aluno.id}>
                        {aluno.name} ({aluno.currentGraduation})
                      </li>
                    ))}
                  </ul>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
