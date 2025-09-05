'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  IconUsers,
  IconClipboardCheck,
  IconSchool,
  IconTools,
} from '@tabler/icons-react'
import React from 'react'

const actions = [
  {
    id: 1,
    title: 'Realizar Nova Frequência',
    icon: <IconClipboardCheck />,
    onClick: () => alert('Nova Frequência'),
  },
  // {
  //   id: 2,
  //   title: 'Cadastrar Professor',
  //   icon: <IconUser />,
  //   onClick: () => alert('Cadastrar Professor'),
  // },
  {
    id: 3,
    title: 'Cadastrar Aluno',
    icon: <IconUsers />,
    onClick: () => alert('Cadastrar Aluno'),
  },
  {
    id: 4,
    title: 'Cadastrar Turma',
    icon: <IconSchool />,
    onClick: () => alert('Cadastrar Turma'),
  },
]

export function Actions() {
  return (
    <>
      <Card className='@container/card'>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <IconTools />
            <CardTitle>Ações</CardTitle>
          </div>
        </CardHeader>
        <CardContent className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {actions.map((action) => (
            <Card
              key={action.id}
              className='cursor-pointer hover:shadow-lg transition-shadow'
              onClick={action.onClick}
            >
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                   <div className='size-12 flex justify-center items-center rounded-full bg-zinc-800 text-white text-lg'>
                    {action.icon}
                  </div>
                   {action.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                Clique aqui para {action.title.toLowerCase()}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </>
  )
}
