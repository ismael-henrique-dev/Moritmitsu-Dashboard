'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'

export function DatePicker() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className='flex flex-col gap-2 max-w-sm'>
      <label className='text-sm font-semibold'>Data da aula</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className='lg:w-[240px] justify-start text-left font-normal w-full'
          >
            {date
              ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
              : 'Escolher data'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0' align='end'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            locale={ptBR}
            className=' lg:w-full'
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
