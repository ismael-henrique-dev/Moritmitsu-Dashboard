import { AddStudentsSheetWrapper } from '@/components/classes/add-students-sheet-wrapper'
import { EnrolledStudentsList } from '@/components/classes/enrolled-students-list'
import { SiteHeader } from '@/components/site-header'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Search } from '@/components/ui/search'
import {
  AddStudentsSheetSkeleton,
  EnrolledStudentsListSkeleton,
} from '@/components/ui/skeletons'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Detalhes da turma',
}

export default async function ClassDetails(props: {
  params: Promise<{ id: string; name: string }>
  searchParams?: Promise<{
    query?: string
    sheetQuery?: string
  }>
}) {
  const { id, name } = await props.params
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const sheetQuery = searchParams?.sheetQuery || ''

  console.log(name)

  const className = decodeURIComponent(name)

  return (
    <>
      <SiteHeader>
        <div className='flex items-center justify-between w-full'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href='/dashboard/classes'>
                  Turmas
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{className}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className='lg:flex hidden'>
            <Suspense fallback={<AddStudentsSheetSkeleton />}>
              <AddStudentsSheetWrapper
                key='desktop'
                classId={id}
                sheetQuery={sheetQuery}
              />
            </Suspense>
          </div>
        </div>
      </SiteHeader>
      <div className='p-5 space-y-6'>
        <div className='lg:hidden'>
          <Suspense fallback={<AddStudentsSheetSkeleton />}>
            <AddStudentsSheetWrapper
              key='mobile'
              classId={id}
              sheetQuery={sheetQuery}
            />
          </Suspense>
        </div>

        <Search placeholder='Buscar alunos...' />
        <Suspense fallback={<EnrolledStudentsListSkeleton />}>
          <EnrolledStudentsList classId={id} query={query} />
        </Suspense>
      </div>
    </>
  )
}
