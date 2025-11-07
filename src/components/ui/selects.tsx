'use client'

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import * as SelectPrimitive from '@radix-ui/react-select'
import { useState } from 'react'

const belts = [
  { id: 'white', name: 'Branca' },
  { id: 'gray', name: 'Cinza' },
  { id: 'yellow', name: 'Amarela' },
  { id: 'orange', name: 'Laranja' },
  { id: 'green', name: 'Verde' },
  { id: 'blue', name: 'Azul' },
  { id: 'purple', name: 'Roxa' },
  { id: 'brown', name: 'Marrom' },
  { id: 'black', name: 'Preta' },
]

const degrees = [
  { id: '1', name: 'Sem grau' },
  { id: '2', name: '1º grau' },
  { id: '3', name: '2º grau' },
  { id: '4', name: '3º grau' },
  { id: '5', name: '4º grau' },
  { id: '6', name: '5º grau' },
  { id: '7', name: '6º grau' },
]

const instructors = [
  { id: '1', name: 'Saulo Bezerra' },
  { id: '2', name: 'Daniel Lima' },
  { id: '3', name: 'Aluno' },
]

const daysOfWeek = [
  { id: 'segunda', name: 'Segunda-feira' },
  { id: 'terca', name: 'Terça-feira' },
  { id: 'quarta', name: 'Quarta-feira' },
  { id: 'quinta', name: 'Quinta-feira' },
  { id: 'sexta', name: 'Sexta-feira' },
  { id: 'sabado', name: 'Sábado' },
  { id: 'domingo', name: 'Domingo' },
]

interface SelectProps
  extends React.ComponentProps<typeof SelectPrimitive.Root> {
  value?: string
  onValueChange?: (value: string) => void
}

export function SelectBelt({ value, onValueChange, ...props }: SelectProps) {
  const selectedBelt =
    belts.find((b) => b.id === value)?.name || 'Escolha a faixa'

  return (
    <Select value={value} onValueChange={onValueChange} {...props}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Escolha a faixa'>{selectedBelt}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {belts.map((belt) => (
          <SelectItem key={belt.id} value={belt.id}>
            {belt.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function SelectDegree({ value, onValueChange, ...props }: SelectProps) {
  const selectedDegree =
    degrees.find((d) => d.id === value)?.name || 'Escolha o grau'

  return (
    <Select value={value} onValueChange={onValueChange} {...props}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Escolha o grau'>{selectedDegree}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {degrees.map((degree) => (
          <SelectItem key={degree.id} value={degree.id}>
            {degree.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

type SelectInstructorProps = {
  ariaInvalid?: boolean
} & React.ComponentProps<typeof SelectPrimitive.Root>

export function SelectInstructor({
  ariaInvalid = false,
  value,
  onValueChange,
  ...props
}: SelectInstructorProps) {
  const selectedInstructor =
    instructors.find((i) => i.id === value)?.name || 'Escolha um professor'

  return (
    <Select value={value} onValueChange={onValueChange} {...props}>
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

type DayOfWeekSelectProps = {
  ariaInvalid?: boolean
} & React.ComponentProps<typeof SelectPrimitive.Root>

export function DayOfWeekSelect({
  ariaInvalid = false,
  value,
  onValueChange,
  ...props
}: DayOfWeekSelectProps) {
  const [selected, setSelected] = useState(value ?? '')

  const handleChange = (option: string) => {
    setSelected(option)
    onValueChange?.(option)
  }

  const selectedDay =
    daysOfWeek.find((day) => day.id === selected)?.name || 'Selecione o dia'

  return (
    <Select value={selected} onValueChange={handleChange} {...props}>
      <SelectTrigger className='w-full' aria-invalid={ariaInvalid}>
        <SelectValue placeholder='Escolha um dia da semana'>
          {selectedDay}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {daysOfWeek.map((day) => (
          <SelectItem key={day.id} value={day.id}>
            {day.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
