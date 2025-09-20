import { SiteHeader } from '@/components/site-header'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Metadata } from 'next'
import { SelectClass } from '@/components/frequency/select'
import { DatePicker } from '@/components/frequency/date-picker'
import { CreateAttendanceForm } from '@/components/forms/create-attendance-form'

export const metadata: Metadata = {
  title: 'Nova Frequência',
}

export default function CreateAttendance() {
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
        

        <div className='grid grid-cols-[1fr_auto] gap-2'>
          <SelectClass />
          <DatePicker />
        </div>

        <CreateAttendanceForm />
      </div>
    </>
  )
}
