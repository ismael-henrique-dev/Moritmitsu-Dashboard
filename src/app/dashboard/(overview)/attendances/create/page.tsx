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
import { CreateAttendanceForm } from '@/components/forms/create-attendance-form'
import { CreateAttendancesFilters } from '@/components/attendances/filters'
import { fetchClasses } from '@/http/classes/get'
import { fetchStudents } from '@/http/students/get'

export const metadata: Metadata = {
  title: 'Nova Frequência',
}

export default async function CreateAttendance(props: {
  searchParams?: Promise<{
    class?: string
  }>
}) {
  const searchParams = await props.searchParams
  const classId = searchParams?.class || ''
  const classesResponse = await fetchClasses()
  const classes = classesResponse.data || []
  const studentsResponse = await fetchStudents('', '', classId, 1)
  const students = studentsResponse.data || []

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
              <BreadcrumbLink href='/dashboard/attendances'>
                Frequência
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Nova Frequência</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </SiteHeader>

      <div className='flex flex-1 flex-col px-4 lg:px-6 py-6 gap-6'>
        <CreateAttendancesFilters classes={classes} />
        <CreateAttendanceForm students={students} />
      </div>
    </>
  )
}
