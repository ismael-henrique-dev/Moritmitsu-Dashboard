'use client'

import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import React from 'react'

const breadcrumbLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  frequency: 'Frequência',
  classes: 'Turmas',
  students: 'Alunos',
  notifications: 'Notificações',
  new: 'Cadastrar',
  create: 'Cadastrar',
  edit: 'Editar',
}

function formatLabel(segment: string) {
  return breadcrumbLabels[segment] || segment
}

export function AppBreadcrumb() {
  const pathname = usePathname() // "/dashboard/students/new"
  const segments = pathname.split('/').filter(Boolean)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((seg, i) => {
          const href = '/' + segments.slice(0, i + 1).join('/')
          const isLast = i === segments.length - 1
          const label = formatLabel(seg)

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
