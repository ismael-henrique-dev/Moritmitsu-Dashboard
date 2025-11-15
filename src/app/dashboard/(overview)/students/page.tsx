import { SiteHeader } from '@/components/site-header'
// import { StudentList } from '@/components/students/students-list'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Search } from '@/components/ui/search'
import Pagination from '@/components/ui/pagination'
import { IconCirclePlus } from '@tabler/icons-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { StudentsList } from '@/components/students/students-list'
import { Suspense } from 'react'
import { StudentListSkeleton } from '@/components/ui/skeletons'

export const metadata: Metadata = {
  title: 'Alunos',
}

export default async function Students(props: {
  searchParams?: Promise<{
    query?: string
  }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const totalPages = 10

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
                <BreadcrumbPage>Alunos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Button
            asChild
            className='lg:flex hidden bg-primary text-white hover:bg-primary/90 py-2 px-3 gap-2'
          >
            <Link href='/dashboard/students/create'>
              <IconCirclePlus className='size-5' />
              <span className='font-poppins font-medium'>Cadastrar aluno</span>
            </Link>
          </Button>
        </div>
      </SiteHeader>
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
            <div className='px-4 lg:px-6 space-y-6 w-full'>
              <Search placeholder='Buscar alunos...' />
              <Button
                asChild
                className='lg:hidden flex bg-primary text-white hover:bg-primary/90 py-2 px-3 gap-2'
              >
                <Link href='/dashboard/students/create'>
                  <IconCirclePlus className='size-5' />
                  <span className='font-poppins font-medium'>
                    Cadastrar aluno
                  </span>
                </Link>
              </Button>

              <Suspense fallback={<StudentListSkeleton />}>
                <StudentsList query={query} />
              </Suspense>

              <div className='flex w-full justify-center'>
                <Pagination totalPages={totalPages} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
