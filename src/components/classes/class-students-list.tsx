'use client'

import { ClassStudentCard } from './class-student-card'

export function ClassStudentList() {
  return (
    <div className='space-y-4'>
      {Array.from({ length: 3 }).map((_, index) => (
        <ClassStudentCard key={index} />
      ))}
    </div>
  )
}
