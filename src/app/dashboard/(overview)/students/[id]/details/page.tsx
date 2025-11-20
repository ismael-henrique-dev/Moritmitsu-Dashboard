import { SectionCards } from '@/components/section-cards'
import { SiteHeader } from '@/components/site-header'
import { StudentDetails } from '@/components/students/student-details'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { getStudentById } from '@/http/students/details'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detalhes',
}

export default async function Details({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const studentData = await getStudentById(id)

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
              <BreadcrumbPage>{studentData.data?.personal_info.full_name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </SiteHeader>
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
            <div className='px-4 lg:px-6'>
              {/* <h2>Details do aluno de id: {id}</h2> */}
              <StudentDetails student={studentData.data!} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
