import { getStudentById } from '@/http/students/details'
import { StudentDetails } from './student-details'

export async function StudentDetailsAsync({ id }: { id: string }) {
  const studentData = await getStudentById(id)
  return <StudentDetails student={studentData.data!} />
}
