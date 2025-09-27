'use client'

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const classes = [
  { id: 'kids', nome: 'Turma Kids' },
  { id: 'adulto', nome: 'Turma Mista' },
  { id: 'competicao', nome: 'Turma Nogi' },
]

export function SelectClass() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const defaultValue = searchParams.get('class')
  const [selected, setSelected] = useState(defaultValue || 'adulto')

  const handleSelectClass = (option: string) => {
    setSelected(option)
    const params = new URLSearchParams(searchParams)

    if (option && option !== 'adulto') {
      params.set('class', option)
    } else if (option === 'adulto') {
      params.delete('class')
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
  }

  const selectedClass =
    classes.find((cls) => cls.id === selected)?.nome || 'Escolha uma turma'

  return (
    <div className='flex flex-col gap-2 w-full'>
      <label className='text-sm font-semibold'>Turma</label>
      <Select value={selected} onValueChange={handleSelectClass}>
        <SelectTrigger className='w-full'>{selectedClass}</SelectTrigger>
        <SelectContent>
          {classes.map((cls) => (
            <SelectItem key={cls.id} value={cls.id}>
              {cls.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
