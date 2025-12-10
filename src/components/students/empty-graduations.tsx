import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { IconAward } from '@tabler/icons-react'

export function EmptyGradutions() {
  return (
    <Card className='p-0 py-6 max-h-dvh h-[800px] flex flex-col flex-1 items-center justify-center'>
      <CardContent className='flex flex-col items-center gap-1'>
        <div className='h-10 w-10 flex items-center justify-center rounded-md bg-morimitsu-red text-white'>
          <IconAward />
        </div>

        <CardTitle className='font-poppins font-medium text-base'>
          Não há graduações ainda
        </CardTitle>

        <p className='text-neutral-500 text-sm text-center'>
          Suas graduações aparecerão aqui.
        </p>
      </CardContent>
    </Card>
  )
}
