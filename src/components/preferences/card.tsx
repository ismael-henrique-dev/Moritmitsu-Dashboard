import { Card, CardContent } from '@/components/ui/card'
import { Button } from '../ui/button'
import { IconPencil } from '@tabler/icons-react'
import { preferenceSchema } from '@/validators/preferences'
import { beltToPtBr, formatAgeRangeForDataTable } from '@/lib/utils'
import z from 'zod'

export function PreferenceCard({
  data: initialData,
}: {
  data: z.infer<typeof preferenceSchema>
}) {
  const formatedAgeRange = formatAgeRangeForDataTable(
    initialData.minAge,
    initialData.maxAge
  )
  const beltPtBr = beltToPtBr(initialData.belt as Belt)
  const belt = beltPtBr.toLocaleUpperCase()

  return (
    <Card className='@container/card cursor-pointer hover:shadow-lg transition-shadow mb-4'>
      <CardContent className='flex justify-between gap-2 text-sm'>
        <div className='grid gap-1'>
          <div className='flex items-center gap-2'>
            <strong className='font-poppins text-sm'>Categoria:</strong>
            <span className='text-sm font-poppins text-neutral-500'>
              {initialData.category}
            </span>
          </div>

          <div className='flex items-center gap-2'>
            <strong className='font-poppins text-sm'>Faixa etária:</strong>
            <span className='text-sm font-poppins text-neutral-500'>
              {formatedAgeRange}
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
              {initialData.totalTrains}
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
