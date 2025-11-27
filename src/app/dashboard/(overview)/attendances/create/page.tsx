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

export const metadata: Metadata = {
  title: 'Nova Frequência',
}

export default async function CreateAttendance() {
  const response = await fetchClasses()
  const classes = response.data || []

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
              <BreadcrumbLink href='/dashboard/frequency'>
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
        <CreateAttendanceForm />
      </div>
    </>
  )
}
