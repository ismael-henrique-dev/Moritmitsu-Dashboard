'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from '@/components/ui/card'
import {
  IconPencil,
  IconUsers,
  IconClipboardCheck,
  IconClock,
} from '@tabler/icons-react'
import { Badge } from '../ui/badge'
import { AttendanceBy } from '@/lib/definitions'
import Link from 'next/link'

type AttendanceCardProps = {
  data: AttendanceBy
}

export function AttendanceCard({ data }: AttendanceCardProps) {
  return (
    <Card className='@container/card hover:shadow-xl'>
      <CardHeader className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <span className='h-12 w-12 rounded-lg grayscale'>
            <div className='size-12 flex justify-center items-center rounded-full bg-zinc-800 text-white text-lg'>
              <IconClipboardCheck />
            </div>
          </span>
          <div className='flex flex-col'>
            <CardTitle className='lg:text-xl text-xl font-semibold tabular-nums'>
              {data.class.name}
            </CardTitle>

            <div className='flex items-center gap-2'>
              <IconClock className='size-4 text-muted-foreground' />
              <span className='text-sm text-muted-foreground'>
                {data.session_date}
              </span>
            </div>
          </div>
        </div>
        <CardAction>
          <Badge variant='secondary' className='h-6 text-sm py-3'>
            <IconUsers className='size-6 text-sm' />

            <span>{data.class._count.students}</span>
          </Badge>
        </CardAction>
      </CardHeader>

      {/* Content */}
      <CardContent className='flex items-center justify-between gap-4 px-6'>
        <div className='flex flex-col gap-1 text-sm text-muted-foreground'>
          <div className='flex items-center gap-2'>
            <span className='font-semibold'>Professor:</span>
            <span>{data.instructor.username}</span>
          </div>
        </div>

        {/* Ações com tooltip */}
        <Link href={`/dashboard/attendances/${data.instructor.username}/edit`}>
          <IconPencil className='size-4' />
        </Link>
      </CardContent>
    </Card>
  )
}
