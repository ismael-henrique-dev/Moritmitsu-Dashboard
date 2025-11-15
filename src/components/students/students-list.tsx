import { fetchStudents } from '@/http/students/get'
import { StudentCard } from './student-card'
import { EmptyStudents } from './empty-students'

export async function StudentsList({ query }: { query: string }) {
  const response = await fetchStudents(query)
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
