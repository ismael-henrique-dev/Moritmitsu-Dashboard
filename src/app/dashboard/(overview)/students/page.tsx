import { StudentList } from '@/components/students/students-list'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Alunos',
}

export default function Students() {
  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <div className='px-4 lg:px-6'>
            {/* <Link href='/dashboard/students/123456/details'>
              Ir para detalhes do aluno de id: 123456
            </Link> */}
            <StudentList />
          </div>
        </div>
      </div>
    </div>
  )
}
