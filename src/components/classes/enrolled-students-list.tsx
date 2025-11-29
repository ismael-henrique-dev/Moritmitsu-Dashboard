'use client'

import { EnrolledStudentItem } from './enrolled-student-item'

export function EnrolledStudentsList() {
  return (
    <div className='space-y-4'>
      {Array.from({ length: 3 }).map((_, index) => (
        <EnrolledStudentItem key={index} />
      ))}
    </div>
  )
}
