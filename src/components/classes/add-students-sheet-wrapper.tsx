import { fetchNotEnrolledStudents } from '@/http/students/not-enrolled'
import { AddStudentsSheet } from './class-student-sheet'

type Props = {
  classId: string
  sheetQuery: string
}

export async function AddStudentsSheetWrapper({ classId, sheetQuery }: Props) {
  const response = await fetchNotEnrolledStudents(classId, sheetQuery)
  const notEnrolledStudents = response.data ?? []

  return (
    <AddStudentsSheet
      classId={classId}
      notEnrolledStudents={notEnrolledStudents}
      query={sheetQuery}
    />
  )
}
