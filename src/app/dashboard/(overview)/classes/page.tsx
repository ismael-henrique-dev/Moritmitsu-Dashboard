import { ClassesList } from '@/components/classes/classes-list'
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
import { Search } from '@/components/ui/search'
import { ClassesListSkeleton } from '@/components/ui/skeletons'
import { IconCirclePlus } from '@tabler/icons-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Turmas',
}

export default async function Classes(props: {
  searchParams?: Promise<{
    query?: string
  }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''

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
                <BreadcrumbPage>Turmas</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button
            asChild
            className='lg:flex hidden bg-primary text-white hover:bg-primary/90 py-2 px-3 gap-2'
          >
            <Link href='/dashboard/classes/create'>
              <IconCirclePlus className='size-5' />
              <span className='font-poppins font-medium'>Cadastrar turma</span>
            </Link>
          </Button>
        </div>
      </SiteHeader>
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
            <div className='px-4 lg:px-6 space-y-6'>
              <div className='w-full space-y-5'>
                <Search placeholder='Buscar turmas...' />
                <Button
                  asChild
                  className='lg:hidden flex bg-primary text-white hover:bg-primary/90 py-2 px-3 gap-2'
                >
                  <Link href='/dashboard/classes/create'>
                    <IconCirclePlus className='size-5' />
                    <span className='font-poppins font-medium'>
                      Cadastrar turma
                    </span>
                  </Link>
                </Button>
              </div>
              <Suspense fallback={<ClassesListSkeleton />}>
                <ClassesList query={query} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
