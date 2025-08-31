import { SectionCards } from '@/components/section-cards'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alunos',
}

export default function Students() {
  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <SectionCards />
          <div className='px-4 lg:px-6'>
            <h2>Alunos asa</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
