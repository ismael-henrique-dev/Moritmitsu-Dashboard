import { fetchAttendances } from '@/http/attendances/get-attendances'
import { AttendancesTable } from './data-table'

type AttendancesDataTableWrapperProps = {
  currentPage: number
  classId: string
  instructorId: string
  date: string
}

export async function AttendancesDataTableWrapper(props: AttendancesDataTableWrapperProps) {
  const attendancesResponse = await fetchAttendances(
    props.currentPage,
    props.classId,
    props.instructorId,
    props.date
  )
  const attendances = attendancesResponse.data?.data ?? []

  return <AttendancesTable data={attendances} />
}
