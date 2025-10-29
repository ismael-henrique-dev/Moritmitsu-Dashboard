'use client'

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'

const daysOfWeek = [
  { id: 'segunda', name: 'Segunda-feira' },
  { id: 'terca', name: 'Terça-feira' },
  { id: 'quarta', name: 'Quarta-feira' },
  { id: 'quinta', name: 'Quinta-feira' },
  { id: 'sexta', name: 'Sexta-feira' },
  { id: 'sabado', name: 'Sábado' },
  { id: 'domingo', name: 'Domingo' },
]

type DayOfWeekSelectProps = {
  error?: string
} & React.ComponentProps<typeof SelectPrimitive.Root>

export function DayOfWeekSelect({
  error,
  value,
  onValueChange,
  ...props
}: DayOfWeekSelectProps) {
  const [selected, setSelected] = React.useState(value ?? '')

  const handleChange = (option: string) => {
    setSelected(option)
    onValueChange?.(option)
  }

  const selectedDay =
    daysOfWeek.find((day) => day.id === selected)?.name || 'Selecione o dia'

  return (
    <div className='flex flex-col gap-2'>
      <Select value={selected} onValueChange={handleChange} {...props}>
        <SelectTrigger className='w-full'>
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

      {/* {error && <p className='text-sm text-red-600'>{error}</p>} */}
    </div>
  )
}
