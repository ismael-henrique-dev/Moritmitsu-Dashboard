import { Card, CardAction, CardFooter } from '@/components/ui/card'
import { IconPencil } from '@tabler/icons-react'
import { PromoteStudentToInstructorDialog } from './promote-student-dialog'
import { DeleteStudentDialog } from './delete-student-dialog'
import { StudentHeader, StudentInfoGrid } from './student-info'
import { getStudentById } from '@/http/students/details'
import Link from 'next/link'
import { CreateGraduationDialog } from './create-graduation-dialog'
import { getUserRole } from '@/lib/get-user'

type StudentDetailsProps = {
  id: string
}

export async function StudentDetails({ id }: StudentDetailsProps) {
  const studentData = await getStudentById(id)
  const { personal_info: personalInfoData, ...basisInfo } = studentData.data!
  const studentId = basisInfo.id

  const studentInfo = {
    id: studentId,
    fullName: personalInfoData.full_name,
    belt: basisInfo.belt,
    grade: basisInfo.grade,
  }

  const role = await getUserRole()
  const isAdmin = role === 'admin'

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
          {isAdmin && (
            <>
              <CreateGraduationDialog data={studentInfo} />
              <PromoteStudentToInstructorDialog />
            </>
          )}
        </CardAction>

        <CardAction className='flex items-center gap-3 h-10'>
          <Link href={`/dashboard/students/${studentId}/edit`}>
            <IconPencil className='ml-auto size-6 cursor-pointer' />
          </Link>
          {isAdmin && <DeleteStudentDialog studentId={studentId} />}
        </CardAction>
      </CardFooter>
    </Card>
  )
}
