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
import { fetchInstructructos } from '@/http/user/get'
import {
  AttendancesListSkeleton,
  AttendancesTableSkeleton,
} from '@/components/ui/skeletons'
import { AttendancesDataTableWrapper } from '@/components/attendances/table-wrapper'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Frequências',
}

export default async function Attandances(props: {
  searchParams?: Promise<{
    instructor?: string
    date?: string
    page?: number
    class?: string
  }>
}) {
  const searchParams = await props.searchParams

  const currentPage = searchParams?.page || 1
  const classId = searchParams?.class || ''
  const instructorId = searchParams?.instructor || ''
  const date = searchParams?.date || ''

  const response = await fetchClasses()
  const classes = response.data || []
  const attendancesResponse = await fetchAttendances(
    currentPage,
    classId,
    instructorId,
    date
  )
  const attendances = attendancesResponse.data?.data ?? []
  const instructorsResponse = await fetchInstructructos()
  const instructors = instructorsResponse.data ?? []

  const totalPages = attendancesResponse.data?.pagination.totalPages ?? 1

  console.log(attendances)

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
        <AttendancesFilters classes={classes} instructors={instructors} />

        <Button
          asChild
          className='lg:hidden bg-primary text-white hover:bg-primary/90 w-full mb-6 py-2 px-3 gap-2'
        >
          <Link href='/dashboard/attendances/create' rel='noopener noreferrer'>
            <IconCirclePlus className='size-5' />
            <span className='font-poppins font-medium'>Nova frêquencia</span>
          </Link>
        </Button>
        <Suspense fallback={<AttendancesListSkeleton />}>
          <AttendancesList
            currentPage={currentPage}
            classId={classId}
            date={date}
            instructorId={instructorId}
          />
        </Suspense>

        {attendances.length >= 1 && (
          <Suspense fallback={<AttendancesTableSkeleton />}>
            <AttendancesDataTableWrapper
              currentPage={currentPage}
              classId={classId}
              date={date}
              instructorId={instructorId}
            />
          </Suspense>
        )}
        <div className='flex w-full justify-center my-6'>
          {totalPages > 1 && <Pagination totalPages={totalPages} />}
        </div>
      </div>
    </>
  )
}
