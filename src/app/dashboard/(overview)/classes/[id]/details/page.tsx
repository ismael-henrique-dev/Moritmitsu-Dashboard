import { AddStudentsSheet } from '@/components/classes/class-student-sheet'
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
import { fetchNotEnrolledStudents } from '@/http/students/not-enrolled'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Detalhes da turma',
}

export default async function ClassDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const notEnrolledStudentsResponse = await fetchNotEnrolledStudents(id)
  const notEnrolledStudents = notEnrolledStudentsResponse.data ?? []

  console.log(notEnrolledStudents)

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
                <BreadcrumbPage>Turma Baby</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className='lg:flex hidden'>
            <AddStudentsSheet notEnrolledStudents={notEnrolledStudents} />
          </div>
        </div>
      </SiteHeader>
      <div className='p-5 space-y-6'>
        <div className='lg:hidden'>
          <AddStudentsSheet notEnrolledStudents={notEnrolledStudents} />
        </div>

        <Search placeholder='Buscar alunos...' />
        <Suspense fallback={'Carrgeando...'}>
          <EnrolledStudentsList classId={id} />
        </Suspense>
      </div>
    </>
  )
}
