import { Suspense } from 'react'
import { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GraduationsList } from '@/components/students/graduations'
import {
  GraduationsListSkeleton,
  StudentDetailsSkeleton,
} from '@/components/ui/skeletons'
import { Skeleton } from '@/components/ui/skeleton'
import { BreadcrumbStudentName } from '@/components/ui/breadcrumb-async'
import { StudentDetails } from '@/components/students/student-details'

export const metadata: Metadata = {
  title: 'Detalhes',
}

export default async function Details({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

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
              <BreadcrumbLink href='/dashboard/students'>Alunos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <Suspense fallback={<Skeleton className='h-4 w-32' />}>
                  <BreadcrumbStudentName id={id} />
                </Suspense>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </SiteHeader>
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
            <div className='px-4 lg:px-6'>
              <Tabs defaultValue='details'>
                <TabsList className='bg-transparent p-0 h-auto mb-2'>
                  <TabsTrigger
                    value='details'
                    className='data-[state=active]:bg-zinc-200 data-[state=active]:shadow-none rounded-md px-4 py-2 font-poppins text-neutral-700 cursor-pointer'
                  >
                    Detalhes
                  </TabsTrigger>
                  <TabsTrigger
                    value='graduations'
                    className='data-[state=active]:bg-zinc-200 data-[state=active]:shadow-none rounded-md px-4 py-2 font-poppins text-neutral-700 cursor-pointer'
                  >
                    Graduações
                  </TabsTrigger>
                </TabsList>
                <TabsContent value='details'>
                  <Suspense fallback={<StudentDetailsSkeleton />}>
                    <StudentDetails id={id} />
                  </Suspense>
                </TabsContent>
                <TabsContent value='graduations'>
                  <Suspense fallback={<GraduationsListSkeleton />}>
                    <GraduationsList id={id} />
                  </Suspense>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
