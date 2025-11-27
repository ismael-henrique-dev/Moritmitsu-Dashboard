'use client'

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const classes = [
  { id: '1', name: 'Turma Baby' },
  { id: '2', name: 'Turma Kids' },
]

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


export function FilterClassSelect() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const defaultValue = searchParams.get('class')
  const [selected, setSelected] = useState(defaultValue || 'all')

  const getSelectedName = () => {
    if (selected === 'all') return 'Todos os professores'
    return (
      classes.find((i) => i.id === selected)?.name ?? 'Escolha um professor'
    )
  }

  const handleSelectTech = (option: string) => {
    setSelected(option)
    const params = new URLSearchParams(searchParams)

    if (option && option !== 'all') {
      params.set('class', option)
    } else if (option === 'all') {
      params.delete('class')
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
  }

  return (
    <Select value={selected} onValueChange={handleSelectTech}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder={getSelectedName()} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>Todas</SelectItem>
        {classes.map((instructor) => (
          <SelectItem key={instructor.id} value={instructor.id}>
            {instructor.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function FilterBeltSelect() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const defaultValue = searchParams.get('belt') || 'all'
  const [selected, setSelected] = useState(defaultValue)

  const getSelectedName = () => {
    if (selected === 'all') return 'Todas as faixas'
    return belts.find((b) => b.id === selected)?.name ?? 'Escolha uma faixa'
  }

  const handleChange = (value: string) => {
    setSelected(value)
    const params = new URLSearchParams(searchParams)

    if (value === 'all') params.delete('belt')
    else params.set('belt', value)

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Select value={selected} onValueChange={handleChange}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder={getSelectedName()} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>Todas</SelectItem>
        {belts.map((b) => (
          <SelectItem key={b.id} value={b.id}>
            {b.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function FilterDegreeSelect() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const defaultValue = searchParams.get('degree') || 'all'
  const [selected, setSelected] = useState(defaultValue)

  const getSelectedName = () => {
    if (selected === 'all') return 'Todos os graus'
    return degrees.find((d) => d.id === selected)?.name ?? 'Escolha um grau'
  }

  const handleChange = (value: string) => {
    setSelected(value)
    const params = new URLSearchParams(searchParams)

    if (value === 'all') params.delete('degree')
    else params.set('degree', value)

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Select value={selected} onValueChange={handleChange}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder={getSelectedName()} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>Todos</SelectItem>
        {degrees.map((d) => (
          <SelectItem key={d.id} value={d.id}>
            {d.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

type FilterInstructorSelectProps = {
  instructors: User[]
}

export function FilterInstructorSelect({
  instructors,
}: FilterInstructorSelectProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const defaultValue = searchParams.get('instructor') || 'all'
  const [selected, setSelected] = useState(defaultValue)

  const getSelectedName = () => {
    if (selected === 'all') return 'Todos'
    return (
      degrees.find((d) => d.id === selected)?.name ?? 'Escolha um professor'
    )
  }

  const handleChange = (value: string) => {
    setSelected(value)
    const params = new URLSearchParams(searchParams)

    if (value === 'all') params.delete('instructor')
    else params.set('instructor', value)

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Select value={selected} onValueChange={handleChange}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder={getSelectedName()} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>Todos</SelectItem>
        {instructors.map((d) => (
          <SelectItem key={d.id} value={d.id}>
            {d.username}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
