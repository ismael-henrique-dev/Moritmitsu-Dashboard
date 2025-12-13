import { FilterClassSelect, FilterInstructorSelect } from '../ui/filters'
import { Label } from '../ui/label'
import { DatePicker } from './date-picker'

// const instructors: {
//   id: string
//   username: string
//   email: string
//   role: 'instructor'
// }[] = [
//   {
//     id: 'inst_001',
//     username: 'marcos.silva',
//     email: 'marcos.silva@example.com',
//     role: 'instructor',
//   },
//   {
//     id: 'inst_002',
//     username: 'ana.pereira',
//     email: 'ana.pereira@example.com',
//     role: 'instructor',
//   },
//   {
//     id: 'inst_003',
//     username: 'carlos.oliveira',
//     email: 'carlos.oliveira@example.com',
//     role: 'instructor',
//   },
//   {
//     id: 'inst_004',
//     username: 'juliana.mendes',
//     email: 'juliana.mendes@example.com',
//     role: 'instructor',
//   },
//   {
//     id: 'inst_005',
//     username: 'fernando.santos',
//     email: 'fernando.santos@example.com',
//     role: 'instructor',
//   },
// ]

export function AttendancesFilters({ classes, instructors }: { classes: Class[], instructors: User[] }) {
  return (
    <div className='grid lg:grid-cols-[1fr_1fr_auto] grid-cols-2 gap-2 mb-6'>
      <div className='grid gap-1'>
        <Label>Turma</Label>
        <FilterClassSelect classes={classes} />
      </div>
      <div className='grid gap-1'>
        <Label>Professor</Label>
        <FilterInstructorSelect instructors={instructors} />
      </div>
      <div className='grid gap-1 lg:col-span-1 col-span-2'>
        <Label>Data</Label>
        <DatePicker />
      </div>
    </div>
  )
}

export function CreateAttendanceFilters({ classes }: { classes: Class[] }) {
  return (
    <div className='grid grid-cols-[1fr_auto] gap-2'>
      <div className='grid gap-1'>
        <Label>Turma</Label>
        <FilterClassSelect classes={classes} />
      </div>

      <div className='grid gap-1 lg:col-span-1 col-span-2'>
        <Label>Data</Label>
        <DatePicker />
      </div>
    </div>
  )
}
