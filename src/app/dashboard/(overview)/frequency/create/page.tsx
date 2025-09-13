


import { SiteHeader } from '@/components/site-header'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import { Metadata } from 'next'
import { CreateFrequency } from '@/components/frequency/create-frequency'

export const metadata: Metadata = {
  title: 'Nova Frequência',
}

const turmas = [
  { id: 'kids', nome: 'Turma Kids' },
  { id: 'adulto', nome: 'Turma Adulto' },
  { id: 'competicao', nome: 'Turma Competição' },
]

export default function NewFrequency() {
  // const [turma, setTurma] = useState<string | null>(null)
  // const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <>
      <SiteHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='/dashboard/frequency'>
                Frequência
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Nova Frequência</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </SiteHeader>

      <div className='flex flex-1 flex-col px-4 lg:px-6 py-6 gap-6'>
        <h2 className='text-lg font-semibold'>Registrar frequência</h2>

        {/* Select de turma */}
        <div className='flex flex-col gap-2 max-w-sm'>
          <label className='text-sm font-medium'>Selecione a turma</label>
          {/* <Select onValueChange={setTurma}>
            <SelectTrigger>
              <SelectValue placeholder='Escolha uma turma' />
            </SelectTrigger>
            <SelectContent>
              {turmas.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
        </div>

        {/* DatePicker */}
        <div className='flex flex-col gap-2 max-w-sm'>
          <label className='text-sm font-medium'>Data da aula</label>
          {/* <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                className='w-[240px] justify-start text-left font-normal'
              >
                {date
                  ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                  : 'Escolher data'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={date}
                onSelect={setDate}
                initialFocus
                locale={ptBR}
              />
            </PopoverContent>
          </Popover> */}
        </div>

        {/* Debug temporário */}
        <div className='text-sm text-muted-foreground'>
          {/* <p>📌 Turma escolhida: {turma ?? 'nenhuma'}</p>
          <p>📅 Data: {date ? format(date, 'dd/MM/yyyy') : 'nenhuma'}</p> */}
        </div>
        <CreateFrequency />
      </div>
    </>
  )
}
