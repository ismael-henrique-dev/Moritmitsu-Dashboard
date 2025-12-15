import { AttendanceCard } from './card'
import { AttendanceBy } from '@/lib/definitions'
import { EmptyAttendances } from './empty-attendances'

type AttendancesListProps = {
  attendances: AttendanceBy[]
}

export function AttendancesList({ attendances }: AttendancesListProps) {
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
