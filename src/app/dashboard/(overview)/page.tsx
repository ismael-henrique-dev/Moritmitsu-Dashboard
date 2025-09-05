import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { Actions } from '@/components/dashboard/actions'
import { Alerts } from '@/components/dashboard/alerts/alerts'
import { SectionCards } from '@/components/section-cards'
import { SiteHeader } from '@/components/site-header'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Dashboard() {
  return (
    <>
      <SiteHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </SiteHeader>
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
            <div className='px-4 lg:px-6 space-y-6'>
             <Alerts />
             <Actions />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
