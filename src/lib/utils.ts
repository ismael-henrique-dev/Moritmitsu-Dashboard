import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { AxiosError } from 'axios'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ]
}

export function getAxiosStatusCode(error: unknown) {
  const statusCode = error instanceof AxiosError ? error.response?.status : null
  return statusCode
}

export function getUserInitials(name: string) {
  if (!name) return ''
  const parts = name.trim().split(' ')
  const initials = parts.filter(Boolean).map((part) => part[0].toUpperCase())
  if (initials.length >= 2) {
    return `${initials[0]}${initials[initials.length - 1]}`
  }
  return initials[0] || ''
}

export const formatCpf = (value: string) => {
  const cleanedValue = value.replace(/\D/g, '') // remove caracteres não numéricos

  if (cleanedValue.length <= 11) {
    // CPF
    return cleanedValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  }
}

export const formatPhone = (value: string) => {
  const cleanedValue = value.replace(/\D/g, '')

  if (cleanedValue.length <= 10) {
    // formato fixo: (99) 9999-9999
    return cleanedValue
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  } else {
    // formato celular: (99) 99999-9999
    return cleanedValue
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  }
}

export function beltToPtBr(belt: Belt): string {
  const map: Record<Belt, string> = {
    white: 'branca',
    gray_white: 'cinza com branca',
    gray: 'cinza',
    gray_black: 'cinza com preto',
    yellow_white: 'amarela com branca',
    yellow: 'amarela',
    yellow_black: 'amarela com preta',
    orange_white: 'laranja com branca',
    orange: 'laranja',
    orange_black: 'laranja com preta',
    green_white: 'verde com branca',
    green: 'verde',
    green_black: 'verde com preta',
    blue: 'azul',
    purple: 'roxa',
    brown: 'marrom',
    black: 'preta',
    red_black: 'coral',
    red: 'vermelha',
    colored_belts: 'Faixas coloridas',
  }

  return map[belt]
}

const daysMap: Record<string, string> = {
  'segunda-feira': 'Seg',
  'terca-feira': 'Ter',
  'terça-feira': 'Ter',
  'quarta-feira': 'Qua',
  'quinta-feira': 'Qui',
  'sexta-feira': 'Sex',
  sabado: 'Sáb',
  sábado: 'Sáb',
  domingo: 'Dom',
}

export function formatSchedule(
  schedule: { dayOfWeek: string; time: string }[]
) {
  if (!schedule || schedule.length === 0) return ''

  const normalized = (text: string) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

  const groups: Record<string, string[]> = {}

  for (const item of schedule) {
    const normalizedDay = normalized(item.dayOfWeek)
    const short = daysMap[normalizedDay] ?? item.dayOfWeek

    if (!groups[item.time]) groups[item.time] = []
    groups[item.time].push(short)
  }

  const parts = Object.entries(groups).map(([time, days]) => {
    const [hour, minute] = time.split(':')
    const formattedTime = `${hour}h${minute !== '00' ? minute : ''}`
    return `${days.join(', ')} - ${formattedTime}`
  })

  return parts.join(' | ')
}

export function formatAgeRange(min: number | null, max: number | null) {
  if (!max) {
    return `${min} anos`
  }

  return `${min} a ${max} anos`
}

export function convertBrazilianDate(dateStr: string) {
  const [day, month, year] = dateStr.split('/')
  return `${year}-${month}-${day}`
}

export function formatAgeRangeForDataTable(
  minAge: number | null,
  maxAge: number | null
) {
  if (minAge === null && maxAge !== null) return `${maxAge}-` // 12-
  if (minAge !== null && maxAge === null) return `${minAge}+` // 16+
  if (minAge !== null && maxAge !== null) return `${minAge} a ${maxAge}` // 12 a 16
  return '-' // fallback (se ambos forem null)
}

export function formatDateBR(iso: string) {
  const date = new Date(`${iso.split('T')[0]}T00:00:00`)
  return format(date, 'dd/MM/yyyy', { locale: ptBR })
}
