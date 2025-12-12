'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { IconPencil, IconCheck } from '@tabler/icons-react'
import { updatePreference } from '@/http/preferences/update'
import { toast } from 'sonner'
import { beltToPtBr, formatAgeRangeForDataTable } from '@/lib/utils'
import { preferenceSchema } from '@/validators/preferences'
import z from 'zod'
import { useForm } from 'react-hook-form'

export function PreferenceCard({
  data,
  editingId,
  setEditingId,
}: {
  data: z.infer<typeof preferenceSchema>
  editingId: string | null
  setEditingId: (id: string | null) => void
}) {
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<{ totalTrainings: number }>({
    defaultValues: {
      totalTrainings: data.totalTrains,
    },
  })

  const isEditingThis = editingId === data.id
  const isEditingOther = editingId !== null && editingId !== data.id

  const handleEdit = () => {
    setEditingId(data.id)
    form.reset({ totalTrainings: form.getValues('totalTrainings') })
  }

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      try {
        const response = await updatePreference(data.id, values)

        if (response.status === 'success') {
          toast.success(response.message)
        } else {
          toast.error(response.message)
        }
      } catch (error) {
        toast.error('Erro ao atualizar preferência.')
      } finally {
        setEditingId(null)
      }
    })
  })

  const formatedAgeRange = formatAgeRangeForDataTable(data.minAge, data.maxAge)
  const beltPtBr = beltToPtBr(data.belt as Belt).toUpperCase()

  return (
    <form onSubmit={onSubmit}>
      <Card className='cursor-pointer hover:shadow-lg transition-shadow'>
        <CardContent className='flex justify-between gap-2 text-sm'>
          <div className='grid gap-1'>
            <div className='flex items-center gap-2'>
              <strong className='font-poppins text-sm'>Categoria:</strong>
              <span className='text-sm font-poppins text-neutral-500'>
                {data.category}
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <strong className='font-poppins text-sm'>Faixa etária:</strong>
              <span className='text-sm font-poppins text-neutral-500'>
                {formatedAgeRange}
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <strong className='font-poppins text-sm'>Faixa:</strong>
              <span className='text-sm font-poppins text-neutral-500'>
                {beltPtBr}
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <strong className='font-poppins text-sm'>
                Treinos necessários:
              </strong>

              {isEditingThis ? (
                <Input
                  type='number'
                  className='w-20 h-8'
                  autoFocus
                  {...form.register('totalTrainings', {
                    valueAsNumber: true,
                  })}
                />
              ) : (
                <span className='text-sm font-poppins text-neutral-500'>
                  {form.watch('totalTrainings')}
                </span>
              )}
            </div>
          </div>
          <div>
            {isEditingThis ? (
              <Button
                type='submit'
                size='icon'
                variant='outline'
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className='size-4 animate-spin' />
                ) : (
                  <IconCheck className='size-4' />
                )}
              </Button>
            ) : isEditingOther ? (
              <div className='cursor-not-allowed'>
                <Button
                  size='icon'
                  variant='outline'
                  disabled
                  className='pointer-events-none opacity-50'
                >
                  <IconPencil className='size-4' />
                </Button>
              </div>
            ) : (
              <Button
                type='button'
                size='icon'
                variant='outline'
                onClick={(e) => {
                  e.preventDefault()
                  handleEdit()
                }}
              >
                <IconPencil className='size-4' />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
