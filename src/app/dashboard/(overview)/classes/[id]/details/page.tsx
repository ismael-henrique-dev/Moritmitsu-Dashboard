import { ClassStudentList } from '@/components/classes/class-students-list'
import { CreateClassForm } from '@/components/forms/create-class'
import { SiteHeader } from '@/components/site-header'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Search } from '@/components/ui/search'
import { IconCirclePlus } from '@tabler/icons-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cadastrar turma',
}

export default function ClassDetails() {
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
                <BreadcrumbLink href='/dashboard/classes'>
                  Turmas
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Turma Baby</BreadcrumbPage>
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
              <span className='font-poppins font-medium'>Enturmar alunos</span>
            </Link>
          </Button>
        </div>
      </SiteHeader>
      <div className='p-5 space-y-6'>
        <Search placeholder='Buscar alunos...' />
        <ClassStudentList />
      </div>
    </>
  )
}
