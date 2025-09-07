'use client'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { IconBell } from '@tabler/icons-react'
import React from 'react'
import { AlertsList } from './alerts-list'

export function Alerts() {
  const [timeRange, setTimeRange] = React.useState('90d')
  return (
    <Card className='@container/card'>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <IconBell />
          <CardTitle>Avisos</CardTitle>
        </div>
        {/* <CardAction>
          <ToggleGroup
            type='single'
            variant='outline'
            className='hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex'
          >
            <ToggleGroupItem value='90d'> 3 meses</ToggleGroupItem>
            <ToggleGroupItem value='30d'> 30 dias</ToggleGroupItem>
            <ToggleGroupItem value='7d'> 7 dias</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className='flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden'
              size='sm'
              aria-label='Select a value'
            >
              <SelectValue placeholder='Last 3 months' />
            </SelectTrigger>
            <SelectContent className='rounded-xl'>
              <SelectItem value='90d' className='rounded-lg'>
                3 meses
              </SelectItem>
              <SelectItem value='30d' className='rounded-lg'>
                30 dias
              </SelectItem>
              <SelectItem value='7d' className='rounded-lg'>
                7 dias
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction> */}
      </CardHeader>
      <CardContent className='px-2 sm:px-6 space-y-6'>
        <AlertsList />
      </CardContent>
    </Card>
  )
}
