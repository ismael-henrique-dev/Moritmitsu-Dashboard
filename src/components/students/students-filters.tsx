import {
  FilterBeltSelect,
  FilterClassSelect,
  FilterGradeSelect,
} from '../ui/filters'
import { Label } from '../ui/label'

export function StudentsFilters({ classes }: { classes: Class[] }) {
  return (
    <div className='grid gap-2 lg:grid-cols-3'>
      <div className='grid gap-1'>
        <Label>Turma</Label>
        <FilterClassSelect classes={classes} />
      </div>
      <div className='grid gap-1'>
        <Label>Faixa</Label>
        <FilterBeltSelect />
      </div>
      <div className='grid gap-1'>
        <Label>Grau</Label>
        <FilterGradeSelect />
      </div>
    </div>
  )
}
