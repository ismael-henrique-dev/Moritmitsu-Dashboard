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
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const defaultValue = searchParams.get('date')

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : today
  )

  const handleSelectDate = (selected?: Date) => {
    setDate(selected)

    const params = new URLSearchParams(searchParams)

    if (selected) {
      const formatted = format(selected, 'yyyy-MM-dd')
      params.set('date', formatted)
    } else {
      params.delete('date')
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className='flex flex-col gap-2 lg:max-w-sm col-span-2 lg:col-span-1'>
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
          className='w-[var(--radix-popover-trigger-width)] p-0 sm:max-w-sm sm:rounded-md'
          align='start'
        >
          <Calendar
            mode='single'
            selected={date}
            onSelect={handleSelectDate}
            locale={ptBR}
            disabled={{
              after: today, // bloqueia datas futuras
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
