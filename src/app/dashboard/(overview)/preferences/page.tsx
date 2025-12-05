export const dynamic = 'force-dynamic'

import { UpdateAccountForm } from '@/components/forms/update-account'
import { PreferencesList } from '@/components/preferences/list'
import { PreferencesTableWrapper } from '@/components/preferences/wrapper-table'

import { SiteHeader } from '@/components/site-header'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import {
  PreferencesListSkeleton,
  PreferencesTableSkeleton,
} from '@/components/ui/skeletons'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Preferências',
}

export default async function Preferences() {
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
              <BreadcrumbPage>Preferências</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </SiteHeader>
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
            <div className='px-4 lg:px-6 grid gap-4'>
              <h2 className='text-xl font-poppins font-semibold'>
                Detalhes da conta
              </h2>
              <UpdateAccountForm />
              <h2 className='text-xl font-poppins font-semibold'>
                Preferências das graduções
              </h2>
              <Suspense fallback={<PreferencesTableSkeleton />}>
                <PreferencesTableWrapper />
              </Suspense>
              <Suspense fallback={<PreferencesListSkeleton />}>
                <PreferencesList />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
