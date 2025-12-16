import { fetchEnrolledStudents } from '@/http/students/get-enrolled'
import { EnrolledStudentItem } from './enrolled-student-item'

export async function EnrolledStudentsList({ classId }: { classId: string }) {
  const enrolledStudentsResponse = await fetchEnrolledStudents(classId)
  const students = enrolledStudentsResponse.data ?? []

  console.log('Students' + students)

  return (
    <div className='space-y-4'>
      {students.map((student, index) => (
        <EnrolledStudentItem key={index} name={student.full_name} />
      ))}
    </div>
  )
}
