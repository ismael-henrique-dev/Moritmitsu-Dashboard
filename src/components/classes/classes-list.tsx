import { fetchClasses } from '@/http/classes/get'
import { ClassCard } from './classe-card'

export async function ClassesList({ query }: { query: string }) {
  const response = await fetchClasses(query)
  const classes = response.data

  return (
    <div className='space-y-6'>
      {classes &&
        classes.map((cls) => (
          <ClassCard
            key={cls.id}
            id={cls.id}
            ageRange={{ max: cls.max_age, min: cls.min_age }}
            instructor={cls.instructor_id}
            studentsCount={12}
            schedule={cls.schedule}
            title={cls.name}
          />
        ))}
    </div>
  )
}
