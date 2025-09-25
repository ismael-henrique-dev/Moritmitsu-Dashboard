
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
import { IconCirclePlusFilled } from '@tabler/icons-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Frequência',
}

import data from "../../data.json"
import { DataTable } from '@/components/attendances/data-table'

export default function Frequency() {
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
                <BreadcrumbPage>Frequência</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button
            asChild
            className='bg-primary text-primary-foreground hover:bg-primary/90'
          >
            <Link href='/dashboard/attendances/create' rel='noopener noreferrer'>
              <IconCirclePlusFilled />
              <span>Nova frêquencia</span>
            </Link>
          </Button>
        </div>
      </SiteHeader>
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
            <div className='px-4 lg:px-6'>
              <div className='flex flex-col md:flex-row gap-2'>
                {/* Filtros aqui */}
              </div>
              {/* <FrequencyList /> */}
              <DataTable data={data} />
              <div className='flex w-full justify-center'>
                <Pagination totalPages={10} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
