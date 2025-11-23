import { PreferencesDataTable } from '@/components/preferences/data-table'
import { PreferencesList } from '@/components/preferences/list'
import { SiteHeader } from '@/components/site-header'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Preferências',
}

const preferencesData = [
  // FAIXAS INFANTIS – sempre 15 treinos
  { id: '1', belt: 'BRANCA', ageRange: '12-', necessaryTraining: 15 },
  { id: '2', belt: 'CINZA/BRANCA', ageRange: '12-', necessaryTraining: 15 },
  { id: '3', belt: 'CINZA', ageRange: '12-', necessaryTraining: 15 },
  { id: '4', belt: 'CINZA/PRETO', ageRange: '12-', necessaryTraining: 15 },
  { id: '5', belt: 'AMARELA/BRANCA', ageRange: '12-', necessaryTraining: 15 },
  { id: '6', belt: 'AMARELA', ageRange: '12-', necessaryTraining: 15 },
  { id: '7', belt: 'AMARELA/PRETA', ageRange: '12-', necessaryTraining: 15 },
  { id: '8', belt: 'LARANJA/BRANCA', ageRange: '12-', necessaryTraining: 15 },
  { id: '9', belt: 'LARANJA', ageRange: '12-', necessaryTraining: 15 },
  { id: '10', belt: 'LARANJA/PRETA', ageRange: '12-', necessaryTraining: 15 },
  { id: '11', belt: 'VERDE/BRANCA', ageRange: '12-', necessaryTraining: 15 },
  { id: '12', belt: 'VERDE', ageRange: '12-', necessaryTraining: 15 },
  { id: '13', belt: 'VERDE/PRETA', ageRange: '12-', necessaryTraining: 15 },

  // FAIXAS ADULTAS – seguem seu padrão especial
  { id: '14', belt: 'BRANCA', ageRange: '12+', necessaryTraining: 30 },
  { id: '15', belt: 'AZUL', ageRange: '12+', necessaryTraining: 40 },
  { id: '16', belt: 'ROXA', ageRange: '12+', necessaryTraining: 45 },
  { id: '17', belt: 'MARROM', ageRange: '12+', necessaryTraining: 45 },
  { id: '18', belt: 'PRETA', ageRange: '12+', necessaryTraining: 60 },
  { id: '19', belt: 'VERMELHA', ageRange: '12+', necessaryTraining: 60 },
]

export default function Preferences() {
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
              <h2 className='text-xl font-poppins font-semibold'>Preferências das graduções</h2>
              <PreferencesDataTable data={preferencesData} />
              <PreferencesList data={preferencesData} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
