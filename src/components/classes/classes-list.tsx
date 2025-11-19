import { fetchClasses } from '@/http/classes/get'
import { ClassCard } from './classe-card'
import { EmptyClasses } from './empty-classes'

export async function ClassesList({ query }: { query: string }) {
  const response = await fetchClasses(query)
  const classes = response.data ?? []
  const hasClasses = classes.length > 0

  return (
    <div className='space-y-6'>
      {hasClasses ? (
        classes.map((cls) => (
          <ClassCard
            key={cls.id}
            id={cls.id}
            ageRange={{ max: cls.max_age, min: cls.min_age }}
            instructor={cls.instructor.username}
            studentsCount={12}
            schedule={cls.schedule}
            title={cls.name}
            totalStudents={0}
          />
        ))
      ) : (
        <EmptyClasses />
      )}
    </div>
  )
}
