import { AttendanceCard } from './card'
import { AttendanceBy } from '@/lib/definitions'

type AttendancesListProps = {
  attendances: AttendanceBy[]
}

export function AttendancesList({ attendances }: AttendancesListProps) {
  return (
    <div className='grid lg:hidden gap-4'>
      {attendances.map((attendance) => (
        <AttendanceCard key={attendance.id} data={attendance} />
      ))}
    </div>
  )
}
