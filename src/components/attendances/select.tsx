'use client'

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

const turmas = [
  { id: 'kids', nome: 'Turma Kids' },
  { id: 'adulto', nome: 'Turma Mista' },
  { id: 'competicao', nome: 'Turma Nogi' },
]

export function SelectClass() {
  const [_, setClass] = useState<string | null>(null)

  return (
    <div className='flex flex-col gap-2 w-full'>
      <label className='text-sm font-semibold'>Turma</label>
      <Select onValueChange={setClass}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Escolha uma turma' />
        </SelectTrigger>
        <SelectContent>
          {turmas.map((t) => (
            <SelectItem key={t.id} value={t.id}>
              {t.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
