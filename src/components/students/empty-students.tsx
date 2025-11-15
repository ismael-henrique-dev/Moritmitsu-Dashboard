import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { IconUsers } from '@tabler/icons-react'
import Link from 'next/link'

export function EmptyStudents() {
  return (
    <Card className='p-0 py-6 max-h-dvh h-[800px] flex flex-col flex-1 items-center justify-center'>
      <CardContent className='flex flex-col items-center gap-1'>
        <div className='h-10 w-10 flex items-center justify-center rounded-md bg-morimitsu-red text-white'>
          <IconUsers />
        </div>

        <CardTitle className='font-poppins font-medium text-base'>
          Não há alunos ainda
        </CardTitle>

        <p className='text-neutral-500 text-sm text-center'>
          Cadastre novos alunos para começar a acompanhar suas turmas e
          graduações.
        </p>
        <div className='pt-4'>
          <Button
            asChild
            className='flex bg-primary text-white hover:bg-primary/90 py-2 px-3 gap-2'
          >
            <Link href='/dashboard/students/create'>
              <span className='font-poppins font-medium text-center'>Cadastrar aluno</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
