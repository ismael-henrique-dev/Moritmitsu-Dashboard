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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-2">
        <Input
          placeholder="Buscar aluno..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1) // reset página
          }}
        />
        <Select
          value={filterBelt}
          onValueChange={(val) => {
            setFilterBelt(val)
            setPage(1)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Faixa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas faixas</SelectItem>
            <SelectItem value="Branca">Branca</SelectItem>
            <SelectItem value="Azul">Azul</SelectItem>
            <SelectItem value="Roxa">Roxa</SelectItem>
            <SelectItem value="Marrom">Marrom</SelectItem>
            <SelectItem value="Preta">Preta</SelectItem>
          </SelectContent>
        </Select>
         <Select
          value={filterBelt}
          onValueChange={(val) => {
            setFilterBelt(val)
            setPage(1)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Faixa" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as turmas</SelectItem>
            <SelectItem value="Branca">Baby</SelectItem>
            <SelectItem value="Azul">Kids</SelectItem>
            <SelectItem value="Roxa">Normal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {students.map((aluno) => (
          <StudentCard key={aluno.id} aluno={aluno} />
        ))}
      </div>

      {/* Paginação */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              aria-disabled={page === 1}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={page === i + 1}
                onClick={() => setPage(i + 1)}
                className='cursor-pointer'
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              aria-disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
