import { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb'
import { CreateAttendanceFilters } from '@/components/attendances/filters'
import { fetchClasses } from '@/http/classes/get'
import { fetchAllStudentsById } from '@/http/attendances/get-all'
import { UpdateAttendanceForm } from '@/components/forms/update-attendance'

export const metadata: Metadata = {
  title: 'Nova Frequência',
}

export default async function EditAttendance(props: {
  searchParams?: Promise<{
    class?: string
    date?: string
  }>
}) {
  const searchParams = await props.searchParams
  const date = searchParams?.date || ''

  const classId = searchParams?.class || ''
  const classesResponse = await fetchClasses()
  const classes = classesResponse.data || []

  const studentsResponse = await fetchAllStudentsById(classId)
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
              <BreadcrumbLink
                className='lg:flex hidden'
                href='/dashboard/attendances'
              >
                Frequências
              </BreadcrumbLink>
              <BreadcrumbEllipsis className='lg:hidden' />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Editar Frequência</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </SiteHeader>

      <div className='flex flex-1 flex-col px-4 lg:px-6 py-6 gap-6'>
        <CreateAttendanceFilters classes={classes} />
        <UpdateAttendanceForm students={students} date={date} classId={classId} />
      </div>
    </>
  )
}
