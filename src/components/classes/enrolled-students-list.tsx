import { fetchEnrolledStudents } from '@/http/students/get-enrolled'
import { EnrolledStudentItem } from './enrolled-student-item'
import { EmptyEnrolled } from './empty-enrolled'

export async function EnrolledStudentsList({
  classId,
  query,
}: {
  classId: string
  query: string
}) {
  const enrolledStudentsResponse = await fetchEnrolledStudents(classId, query)
  const students = enrolledStudentsResponse.data ?? []

  const hasStudents = students.length > 0

  if (!hasStudents) {
    return <EmptyEnrolled />
  }

  return (
    <div className='space-y-4'>
      {students.map((student) => (
        <EnrolledStudentItem
          key={student.id}
          name={student.full_name}
          classId={classId}
          studentId={student.id}
        />
      ))}
    </div>
  )
}
