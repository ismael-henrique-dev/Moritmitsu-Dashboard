import { IconTrendingUp } from '@tabler/icons-react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function ClassCard() {
  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardDescription>Turma Baby</CardDescription>
        <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
          4.5%
        </CardTitle>
        <CardAction>
          <Badge variant='outline'>
            <IconTrendingUp />
            +4.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className='flex-col items-start gap-1.5 text-sm'>
        <div className='line-clamp-1 flex gap-2 font-medium'>
          Steady performance increase <IconTrendingUp className='size-4' />
        </div>
        <div className='text-muted-foreground'>Meets growth projections</div>
      </CardFooter>
    </Card>
  )
}
