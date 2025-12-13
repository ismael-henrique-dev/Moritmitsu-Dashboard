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
import { fetchInstructructos } from '@/http/user/get'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cadastrar turma',
}

export default async function CreateClass() {
  const instructorsResponse = await fetchInstructructos()
  const instructors = instructorsResponse.data ?? []

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
              <BreadcrumbLink href='/dashboard/classes'>Turmas</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Cadastrar turma</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </SiteHeader>
      <div className='grid flex-1 '>
        <CreateClassForm instructors={instructors} />
      </div>
    </>
  )
}
