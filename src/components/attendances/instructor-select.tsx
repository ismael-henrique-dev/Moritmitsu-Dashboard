'use client'

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const instructors = [
  { id: '1', name: 'Saulo Bezerra' },
  { id: '2', name: 'Daniel Lima' },
  { id: '3', name: 'Aluno' },
]

import * as SelectPrimitive from '@radix-ui/react-select'

export function SelectInstructor({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const defaultValue = searchParams.get('instructor')
  const [selected, setSelected] = useState(defaultValue || '1')

  const handleSelectInstructor = (option: string) => {
    setSelected(option)
    const params = new URLSearchParams(searchParams)

    if (option && option !== '1') {
      params.set('instructor', option)
    } else if (option === '1') {
      params.delete('instructor')
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
  }

  const selectedInstructor =
    instructors.find((i) => i.id === selected)?.name || 'Escolha um professor'

  return (
    <Select value={selected} onValueChange={handleSelectInstructor} {...props}>
      <SelectTrigger className='w-full'>
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
