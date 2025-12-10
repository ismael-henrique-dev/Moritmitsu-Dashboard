import { fetchGraduationsByStudentId } from '@/http/graduations/get'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardTitle } from '../ui/card'
import { beltToPtBr } from '@/lib/utils'

export async function GraduationsList({ id }: { id: string }) {
  const response = await fetchGraduationsByStudentId(id)
  const graduations = response.data ?? []

  return (
    <Card>
      <CardContent className='gap-4 flex flex-col min-h-[700px]'>
        {graduations.map((graduation, index) => {
          const belt = beltToPtBr(graduation.belt)
          const grade = graduation.grade
          const graduationDate = graduation.graduation_date

          return (
            <Card key={index}>
              <CardContent className='flex justify-between items-center h-auto'>
                <CardTitle>
                  Faixa {belt} - Grau {grade}
                </CardTitle>
                <Badge variant='outline' className='h-6 text-sm'>
                  <span className='text-sm font-semibold'>
                    {graduationDate}
                  </span>
                </Badge>
              </CardContent>
            </Card>
          )
        })}
      </CardContent>
    </Card>
  )
}
