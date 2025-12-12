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
import { CreateAttendanceForm } from '@/components/forms/create-attendance'
import { CreateAttendanceFilters } from '@/components/attendances/filters'
import { fetchClasses } from '@/http/classes/get'
import { fetchAllStudentsById } from '@/http/attendances/get-all'
import { format } from 'date-fns'

export const metadata: Metadata = {
  title: 'Nova Frequência',
}

export default async function CreateAttendance(props: {
  searchParams?: Promise<{
    class?: string
    date?: string
  }>
}) {
  const today = format(new Date(), 'yyyy-MM-dd')

  const searchParams = await props.searchParams
  const date = searchParams?.date || today

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
              <BreadcrumbPage>Nova Frequência</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </SiteHeader>

      <div className='flex flex-1 flex-col px-4 lg:px-6 py-6 gap-6'>
        <CreateAttendanceFilters classes={classes} />
        <CreateAttendanceForm
          students={students}
          date={date}
          classId={classId}
        />
      </div>
    </>
  )
}
