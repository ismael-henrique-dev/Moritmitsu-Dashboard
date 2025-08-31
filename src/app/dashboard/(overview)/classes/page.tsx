import { ClassCard } from '@/components/classes/classe-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Turmas',
}

export default function Classes() {
  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <div className='px-4 lg:px-6 space-y-6'>
            {/* <h2 className='mb-4'>Turmas</h2> */}

            <div className='flex gap-3'>
              <Input type='text' placeholder='Buscar turmas...' />
              <Button type='submit' className='cursor-pointer'>Buscar</Button>
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
  )
}
