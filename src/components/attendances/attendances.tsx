import { AttendanceCard } from './card'
import { EmptyAttendances } from './empty-attendances'
import { fetchAttendances } from '@/http/attendances/get-attendances'

type AttendancesListProps = {
  currentPage: number
  classId: string
  instructorId: string
  date: string
}

export async function AttendancesList(props: AttendancesListProps) {
  const attendancesResponse = await fetchAttendances(
    props.currentPage,
    props.classId,
    props.instructorId,
    props.date
  )
  const attendances = attendancesResponse.data?.data ?? []

  const hasAttendances = attendances.length > 0

  if (!hasAttendances) {
    return <EmptyAttendances />
  }

  return (
    <div className='grid lg:hidden gap-4'>
      {attendances.map((attendance) => (
        <AttendanceCard key={attendance.id} data={attendance} />
      ))}
    </div>
  )
}
