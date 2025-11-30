import { Card, CardAction, CardFooter } from '@/components/ui/card'
import { Button } from '../ui/button'
import { IconAward, IconPencil } from '@tabler/icons-react'
import { PromoteStudentToInstructorDialog } from './promote-student-dialog'
import { DeleteStudentDialog } from './delete-student-dialog'
import { StudentHeader, StudentInfoGrid } from './student-info'
import { getStudentById } from '@/http/students/details'
import Link from 'next/link'

type StudentDetailsProps = {
  id: string
}

export async function StudentDetails({ id }: StudentDetailsProps) {
  const studentData = await getStudentById(id)
  const { personal_info: personalInfoData, ...basisInfo } = studentData.data!
  const studentId = basisInfo.id

  return (
    <Card className='@container/card'>
      <StudentHeader
        fullName={personalInfoData.full_name}
        alias={basisInfo.alias}
        email={basisInfo.email}
        totalFrequency={basisInfo.total_frequency}
      />
      <StudentInfoGrid basicInfo={basisInfo} personalInfo={personalInfoData} />
      <CardFooter className='flex w-full justify-between items-center'>
        <CardAction className='flex gap-3 lg:flex-row flex-col'>
          <Button className='bg-morimitsu-red text-white hover:bg-morimitsu-red/90 py-2 px-3 gap-2 cursor-pointer'>
            <IconAward className='size-5' />
            <span className='font-poppins font-medium'>Graduar Aluno</span>
          </Button>
          <PromoteStudentToInstructorDialog />
        </CardAction>
        <CardAction className='flex items-center gap-3 h-10'>
          <Link href={`/dashboard/students/${studentId}/edit`}>
            <IconPencil className='ml-auto size-6 cursor-pointer' />
          </Link>

          <DeleteStudentDialog studentId={studentId} />
        </CardAction>
      </CardFooter>
    </Card>
  )
}
