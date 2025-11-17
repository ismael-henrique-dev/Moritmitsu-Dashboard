import { Skeleton } from '@/components/ui/skeleton'
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

export function NavUserSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='flex items-center space-x-2 cursor-not-allowed'
        >
          <Skeleton className='size-10 rounded-lg' />
          <div className='grid flex-1 space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-3 w-3/4' />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

import { Card, CardContent, CardHeader } from '@/components/ui/card'

function ClassCardSkeleton() {
  return (
    <Card className='@container/card mb-4'>
      <CardHeader className='flex justify-between items-start'>
        <div className='space-y-2'>
          <Skeleton className='h-6 w-[180px]' />
          <Skeleton className='h-4 w-[140px]' />
        </div>

        <div className='flex items-center gap-3'>
          <Skeleton className='h-5 w-5 rounded-md' />
          <Skeleton className='h-5 w-5 rounded-md' />
        </div>
      </CardHeader>

      <CardContent className='grid gap-3 text-sm'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-4 rounded-full' />
          <Skeleton className='h-4 w-[240px]' />
        </div>

        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-4 rounded-full' />
          <Skeleton className='h-4 w-[200px]' />
        </div>

        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-4 rounded-full' />
          <Skeleton className='h-4 w-[160px]' />
        </div>
      </CardContent>
    </Card>
  )
}

export function ClassesListSkeleton() {
  return (
    <div className='space-y-6'>
      {Array.from({ length: 4 }).map((_, index) => (
        <ClassCardSkeleton key={index} />
      ))}
    </div>
  )
}

function StudentCardSkeleton() {
  return (
    <Card className='mb-4 p-0'>
      <CardContent className='flex justify-between items-center px-3 py-3'>
        <div className='flex items-center gap-4'>
          {/* Avatar */}
          <Skeleton className='h-8 w-8 rounded-lg' />

          {/* Nome */}
          <Skeleton className='h-4 w-32' />
        </div>

        {/* Faixa e Grau */}
        <Skeleton className='h-4 w-24' />
      </CardContent>
    </Card>
  )
}

export function StudentListSkeleton() {
  return (
    <div className='space-y-6'>
      {Array.from({ length: 10 }).map((_, index) => (
        <StudentCardSkeleton key={index} />
      ))}
    </div>
  )
}
