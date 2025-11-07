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

import * as SelectPrimitive from '@radix-ui/react-select'

type SelectInstructorProps = {
  ariaInvalid?: boolean
} & React.ComponentProps<typeof SelectPrimitive.Root>

export function SelectInstructor({
  ariaInvalid = false,
  value,
  onValueChange,
  ...props
}: SelectInstructorProps) {
  const [selected, setSelected] = useState('1')

  const handleSelectInstructor = (option: string) => {
    setSelected(option)
    onValueChange?.(option)
  }

  const selectedInstructor =
    instructors.find((i) => i.id === selected)?.name || 'Escolha um professor'

  return (
    <Select value={selected} onValueChange={handleSelectInstructor} {...props}>
      <SelectTrigger className='w-full' aria-invalid={ariaInvalid}>
        <SelectValue placeholder='Escolha uma professor'>
          {selectedInstructor}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {instructors.map((instructor) => (
          <SelectItem key={instructor.id} value={instructor.id}>
            {instructor.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
