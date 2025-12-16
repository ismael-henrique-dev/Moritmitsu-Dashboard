import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { IconSchool } from '@tabler/icons-react'

export function EmptyNotEnrolled() {
  return (
    <Card className='p-0 py-6 max-h-dvh h-[800px] flex flex-col flex-1 items-center justify-center rounded-none'>
      <CardContent className='flex flex-col items-center gap-1'>
        <div className='h-10 w-10 flex items-center justify-center rounded-md bg-morimitsu-red text-white'>
          <IconSchool />
        </div>

        <CardTitle className='font-poppins font-medium text-base'>
          Nenhum aluno disponível no momento
        </CardTitle>

        <p className='text-neutral-500 text-sm text-center font-poppins'>
          Assim que houver alunos aptos para serem enturmados, eles aparecerão
          aqui.
        </p>
      </CardContent>
    </Card>
  )
}
