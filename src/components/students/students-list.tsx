import { fetchStudents } from '@/http/students/get'
import { StudentCard } from './student-card'

export async function StudentsList({ query }: { query: string }) {
  const response = await fetchStudents(query)
  const students = response.data

  return (
    <div className='space-y-6'>
      {students &&
        students.map((student) => (
          <StudentCard
            key={student.id}
            id={student.id}
            belt={student.belt}
            grade={student.grade}
            title={student.name}
          />
        ))}
    </div>
  )
}
