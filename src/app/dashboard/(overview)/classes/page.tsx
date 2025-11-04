import { ClassesList } from '@/components/classes/classes-list'
import { SiteHeader } from '@/components/site-header'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Search } from '@/components/ui/search'
import { ClassesListSkeleton } from '@/components/ui/skeletons'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Turmas',
}

export default async function Classes(props: {
  searchParams?: Promise<{
    query?: string
  }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''

  return (
    <>
      <SiteHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Turmas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </SiteHeader>
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
            <div className='px-4 lg:px-6 space-y-6'>
              <div className='w-full'>
                <Search placeholder='Buscar turmas...' />
              </div>
              <Suspense fallback={<ClassesListSkeleton />}>
                <ClassesList query={query} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
