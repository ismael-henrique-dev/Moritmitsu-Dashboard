import { AddStudentsSheet } from '@/components/classes/class-student-sheet'
import { ClassStudentList } from '@/components/classes/class-students-list'
import { SiteHeader } from '@/components/site-header'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Search } from '@/components/ui/search'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detalhes da turma',
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
          <AddStudentsSheet />
        </div>
      </SiteHeader>
      <div className='p-5 space-y-6'>
        <Search placeholder='Buscar alunos...' />
        <ClassStudentList />
      </div>
    </>
  )
}
