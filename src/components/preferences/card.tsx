import { Card, CardContent } from '@/components/ui/card'
import { Button } from '../ui/button'
import { IconPencil } from '@tabler/icons-react'

type PreferenceCardProps = {
  id: string
  ageRange: string
  belt: string
  necessaryTraining: number
}

export function PreferenceCard({
  id,
  ageRange,
  belt,
  necessaryTraining,
}: PreferenceCardProps) {
  return (
    <Card className='@container/card cursor-pointer hover:shadow-lg transition-shadow mb-4'>
      <CardContent className='flex justify-between gap-2 text-sm'>
        <div className='grid gap-1'>
          <div className='flex items-center gap-2'>
            <strong className='font-poppins text-sm'>Faixa etária:</strong>
            <span className='text-sm font-poppins text-neutral-500'>
              {ageRange}
            </span>
          </div>

          <div className='flex items-center gap-2'>
            <strong className='font-poppins text-sm'>Faixa:</strong>
            <span className='text-sm font-poppins text-neutral-500'>
              {belt}
            </span>
          </div>

          <div className='flex items-center gap-2'>
            <strong className='font-poppins text-sm'>
              Treinos necessários:
            </strong>
            <span className='text-sm font-poppins text-neutral-500'>
              {necessaryTraining}
            </span>
          </div>
        </div>
        <div>
          <Button size='icon' variant='outline' className='cursor-pointer'>
            <IconPencil className='size-4' />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
