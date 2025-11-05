'use client'

import { StudentCard } from './student-card'

export async function StudentsList() {
  // const response = await fetchClasses(query)
  // const classes = response.data

  return (
    <div className='space-y-6'>
      {Array.from({ length: 10 }).map((_, index) => (
        <StudentCard key={index} />
      ))}
    </div>
  )
}
