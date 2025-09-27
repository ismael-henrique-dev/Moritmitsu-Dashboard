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
import { IconCirclePlusFilled } from '@tabler/icons-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Frequências',
}

import data from '../../data.json'
import { DataTable } from '@/components/attendances/data-table'

import { SelectClass } from '@/components/attendances/class-select'
import { DatePicker } from '@/components/attendances/date-picker'
import { SelectInstructor } from '@/components/attendances/instructor-select'
import { AttendancesList } from '@/components/attendances/attendances-list'

export default function Attandances() {
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
            className='bg-primary text-primary-foreground hover:bg-primary/90'
          >
            <Link
              href='/dashboard/attendances/create'
              rel='noopener noreferrer'
            >
              <IconCirclePlusFilled />
              <span>Nova frêquencia</span>
            </Link>
          </Button>
        </div>
      </SiteHeader>
      {/* <div className='flex flex-1 flex-col'> */}
      {/* <div className='@container/main flex flex-1 flex-col gap-5'> */}
      {/* <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'> */}
      <div className='px-4 lg:px-6 py-6'>
        <div className='grid lg:grid-cols-[1fr_1fr_auto] grid-cols-2 gap-2 mb-6'>
          <SelectClass />
          <SelectInstructor />
          <DatePicker />
        </div>

        <AttendancesList />
        <DataTable data={data} />
        <div className='flex w-full justify-center my-6'>
          <Pagination totalPages={10} />
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
    </>
  )
}
