import { Badge } from '../ui/badge'
import { Card, CardContent, CardTitle } from '../ui/card'

export function GraduationsList() {
  return (
    <Card>
      <CardContent className='gap-4 flex flex-col min-h-[700px]'>
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index}>
            <CardContent className='flex justify-between items-center h-auto'>
              <CardTitle>Faixa Roxa - Grau 2</CardTitle>
              <Badge variant='outline' className='h-6 text-sm'>
                <span className='text-sm font-semibold'>23/04/2025</span>
              </Badge>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
