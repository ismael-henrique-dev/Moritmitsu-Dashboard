import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IconUsers, IconClipboardCheck, IconSchool } from '@tabler/icons-react'
import { type Icon } from '@tabler/icons-react'
import Link from 'next/link'

type Action = {
  id: number
  title: string
  icon: Icon
  url: string
}

const actions: Action[] = [
  {
    id: 1,
    title: 'Realizar Frequência',
    icon: IconClipboardCheck,
    url: '/dashboard/attendances/create',
  },
  {
    id: 2,
    title: 'Cadastrar Aluno',
    icon: IconUsers,
    url: '/dashboard/students/create',
  },
  {
    id: 3,
    title: 'Cadastrar Turma',
    icon: IconSchool,
    url: '/dashboard/classes/create',
  },
]

export function QuickActions() {
  return (
    <div className='space-y-4'>
      <CardHeader className='px-0'>
        <CardTitle className='lg:text-xl font-poppins'>Ações</CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-1 sm:grid-cols-2 gap-4 px-0'>
        {actions.map((action) => {
          const Icon = action.icon

          return (
            <Link key={action.id} href={action.url}>
              <Card className='cursor-pointer hover:shadow-lg transition-shadow'>
                <CardHeader className='flex flex-row items-center'>
                  <div className='size-10 flex justify-center items-center rounded-full bg-zinc-800 text-white'>
                    <Icon size={24} />
                  </div>
                  <CardTitle className='lg:text-lg font-poppins'>
                    {action.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Clique aqui para {action.title.toLowerCase()}
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </CardContent>
    </div>
  )
}
