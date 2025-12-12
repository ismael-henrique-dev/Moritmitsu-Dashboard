import { SiteHeader } from '@/components/site-header'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import Pagination from '@/components/ui/pagination'
import { IconCirclePlus } from '@tabler/icons-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { AttendancesList } from '@/components/attendances/attendances'
import { AttendancesFilters } from '@/components/attendances/filters'
import { fetchClasses } from '@/http/classes/get'
import { fetchAttendances } from '@/http/attendances/get-attendances'
import { AttendancesTable } from '@/components/attendances/data-table'

export const metadata: Metadata = {
  title: 'Frequências',
}

export default async function Attandances() {
  const response = await fetchClasses()
  const classes = response.data || []
  const attendancesResponse = await fetchAttendances()
  const attendances = attendancesResponse.data ?? []

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
                <BreadcrumbPage>Frequências</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button
            asChild
            className='lg:flex hidden bg-primary text-white hover:bg-primary/90 py-2 px-3 gap-2'
          >
            <Link
              href='/dashboard/attendances/create'
              rel='noopener noreferrer'
            >
              <IconCirclePlus className='size-5' />
              <span className='font-poppins font-medium'>Nova frequência</span>
            </Link>
          </Button>
        </div>
      </SiteHeader>

      <div className='px-4 lg:px-6 py-6'>
        <AttendancesFilters classes={classes} />

        <Button
          asChild
          className='lg:hidden bg-primary text-white hover:bg-primary/90 w-full mb-6 py-2 px-3 gap-2'
        >
          <Link href='/dashboard/attendances/create' rel='noopener noreferrer'>
            <IconCirclePlus className='size-5' />
            <span className='font-poppins font-medium'>Nova frêquencia</span>
          </Link>
        </Button>

        <AttendancesList attendances={attendances} />
        <AttendancesTable data={attendances} />
        <div className='flex w-full justify-center my-6'>
          <Pagination totalPages={10} />
        </div>
      </div>
    </>
  )
}
