'use client'

const alunos = Array.from({ length: 120 }, (_, i) => ({
  id: String(i + 1),
  name: `Aluno ${i + 1}`,
  avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
  classTitle: i % 2 === 0 ? 'Turma Kids' : 'Turma Adulto',
  belt: ['Branca', 'Azul', 'Roxa', 'Marrom', 'Preta'][i % 5],
  lastAttendance: '2025-08-27',
  status: i % 3 === 0 ? 'Ativo' : 'Trancado',
}))

import { useState, useMemo } from 'react'
import { StudentCard } from './student-card'

export function StudentList() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [filterBelt, setFilterBelt] = useState('all')

  const perPage = 10

  // filtra alunos por busca e faixa
  const filtered = useMemo(() => {
    return alunos.filter((a) => {
      const matchSearch = a.name.toLowerCase().includes(search.toLowerCase())
      const matchBelt = filterBelt === 'all' || a.belt === filterBelt
      return matchSearch && matchBelt
    })
  }, [search, filterBelt])

  const totalPages = Math.ceil(filtered.length / perPage)
  const students = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-2'>
      {students.map((aluno) => (
        <StudentCard key={aluno.id} aluno={aluno} />
      ))}
    </div>
  )
}
