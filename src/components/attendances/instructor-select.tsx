'use client'

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

const instructors = [
  { id: '1', name: 'Saulo Bezerra' },
  { id: '2', name: 'Daniel Lima' },
  { id: '3', name: 'Aluno' },
]

export function SelectInstructor() {
  const [_, setInstructor] = useState<string | null>(null)

  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm font-semibold'>Professor</label>
      <Select onValueChange={setInstructor}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Escolha uma professor' />
        </SelectTrigger>
        <SelectContent>
          {instructors.map((t) => (
            <SelectItem key={t.id} value={t.id}>
              {t.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
