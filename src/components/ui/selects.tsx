'use client'

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import * as SelectPrimitive from '@radix-ui/react-select'

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
