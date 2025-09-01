import { ClassCard } from '@/components/classes/classe-card'
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
import { Input } from '@/components/ui/input'
import { Search } from '@/components/ui/search'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Turmas',
}

export default function Classes() {
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
              <BreadcrumbPage>Turmas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </SiteHeader>
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
            <div className='px-4 lg:px-6 space-y-6'>
              <div className='flex gap-3'>
                <Search placeholder='Buscar turmas...' />
                <Button type='submit' className='cursor-pointer'>
                  Buscar
                </Button>
              </div>

              <div className='space-y-6'>
                <ClassCard />
                <ClassCard />
                <ClassCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
