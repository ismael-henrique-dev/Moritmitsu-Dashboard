import { SiteHeader } from '@/components/site-header'
import { StudentList } from '@/components/students/students-list'
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
import { IconCirclePlusFilled } from '@tabler/icons-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Alunos',
}

export default function Students() {
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
            className='bg-primary text-primary-foreground hover:bg-primary/90'
          >
            <Link href='/dashboard/students/create' rel='noopener noreferrer'>
              <IconCirclePlusFilled />
              <span>Cadastrar aluno</span>
            </Link>
          </Button>
        </div>
      </SiteHeader>
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
            <div className='px-4 lg:px-6 space-y-6'>
              {/* <Link href='/dashboard/students/123456/details'>
                Ir para detalhes do aluno de id: 123456
              </Link> */}
              {/* Filtros */}
              <div className='flex flex-col md:flex-row gap-2'>
                <Search placeholder='Buscar alunos...' />
              </div>
              <StudentList />
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
