import { fetchStudents } from '@/http/students/get'
import { StudentCard } from './student-card'
import { EmptyStudents } from './empty-students'

export async function StudentsList({
  query,
  belt,
  currentPage,
  grade,
}: {
  query: string
  belt: string
  currentPage: number
  grade?: number
}) {
  const response = await fetchStudents(query, belt, currentPage, grade)
  const students = response.data ?? []
  const hasStudents = students.length > 0

  return (
    <div className='space-y-6'>
      {hasStudents ? (
        students.map((student) => (
          <StudentCard
            key={student.id}
            id={student.id}
            belt={student.belt}
            grade={student.grade}
            title={student.name}
          />
        ))
      ) : (
        <EmptyStudents />
      )}
    </div>
  )
}
