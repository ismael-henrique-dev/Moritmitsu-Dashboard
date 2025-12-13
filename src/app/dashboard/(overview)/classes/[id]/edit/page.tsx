import { UpdateClassForm } from '@/components/forms/update-class'
import { SiteHeader } from '@/components/site-header'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { fetchClasseDetailsById } from '@/http/classes/details'
import { fetchInstructructos } from '@/http/user/get'

import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Editar turma',
}

export default async function EditClass({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const instructorsResponse = await fetchInstructructos()
  const instructors = instructorsResponse.data ?? []
  const classDetailsResponse = await fetchClasseDetailsById(id)
  const classData = classDetailsResponse.data

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
              <BreadcrumbPage>Editar turma</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </SiteHeader>
      <Suspense fallback={<div className='p-5'>Carregando professores...</div>}>
        <UpdateClassForm instructors={instructors} classData={classData!} classId={id} />
      </Suspense>
    </>
  )
}
