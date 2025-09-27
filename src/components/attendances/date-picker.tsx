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
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function DatePicker() {
  const [] = useState<Date | undefined>(new Date())

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const defaultValue = searchParams.get('date')

  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  )

  const handleSelectDate = (selectedDate: Date | undefined) => {
    setDate(selectedDate)

    const params = new URLSearchParams(searchParams)

    if (selectedDate) {
      params.set('date', selectedDate.toISOString())
    } else {
      params.delete('date')
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
  }

  return (
    <div className='flex flex-col gap-2 max-w-sm col-span-2 lg:col-span-1'>
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
        <PopoverContent
          className='w-[var(--radix-popover-trigger-width)]  p-0 sm:max-w-sm sm:rounded-md'
          align='start'
        >
          <Calendar
            mode='single'
            selected={date}
            onSelect={handleSelectDate}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
