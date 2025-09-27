import Link from 'next/link'
import { AttendanceCard } from './card'

type AttendancesListProps = {
  data: Attendance[]
}

export function AttendancesList({ data: attendances }: AttendancesListProps) {
  return (
    <div className='grid lg:hidden gap-4'>
      {attendances.map((attendance) => (
        <Link key={attendance.id} href='#' className='mb-4'>
          <AttendanceCard data={attendance} />
        </Link>
      ))}
    </div>
  )
}
