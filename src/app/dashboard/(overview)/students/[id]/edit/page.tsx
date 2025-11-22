import { UpdateStudentForm } from '@/components/forms/update-student-form'
import { SiteHeader } from '@/components/site-header'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getStudentById } from '@/http/students/details'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editar aluno',
}

export default async function EditStudent({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const response = await getStudentById(id)

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
              <BreadcrumbLink href='/dashboard/students'>Alunos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Editar aluno</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </SiteHeader>
      <UpdateStudentForm id={id} student={response.data!} />
    </>
  )
}
