'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '../ui/spinner'
import { SelectInstructor } from '../attendances/instructor-select'

import {
  createClassFormSchema,
  CreateClassFormData,
} from '@/validators/create-class'
import { IconPlus } from '@tabler/icons-react'
import { DayOfWeekSelect } from '../classes/day-of-week-select'
import { createClass } from '@/http/classes/create'
import { toast } from 'sonner'

export function CreateClassForm() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClassFormData>({
    resolver: zodResolver(createClassFormSchema),
    mode: 'onChange',
    defaultValues: {
      schedules: [{ dayOfWeek: '', time: '' }],
      maxAge: null,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schedules',
  })

  const handleCreateClass = (data: CreateClassFormData) => {
    startTransition(async () => {
      console.log(data)
      // const response = await createClass(data)

      // if (response.status === 'success') {
      //   toast.success(response.message)
      //   router.push('/dashboard/classes')
      // } else {
      //   toast.error(response.message)
      // }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateClass)}
      className='flex flex-col gap-6 p-5'
    >
      {/* Nome da turma */}
      <div className='grid gap-1'>
        <Label htmlFor='name' className='font-semibold font-poppins'>
          Nome da turma
        </Label>
        <Input
          id='name'
          placeholder='Ex: Nogi, Infantil, Avançado'
          {...register('name')}
        />
        {errors.name && (
          <p className='text-red-600 text-sm'>{errors.name.message}</p>
        )}
      </div>

      {/* Faixa etária */}
      <div className='grid gap-1'>
        <Label className='font-semibold font-poppins'>
          Faixa etária (anos)
        </Label>
        <div className='grid grid-cols-2 gap-2'>
          <div>
            <Input
              type='number'
              placeholder='Idade mínima'
              {...register('minAge', { valueAsNumber: true })}
            />
            {errors.minAge && (
              <p className='text-red-600 text-sm'>{errors.minAge.message}</p>
            )}
          </div>
          <div>
            <Input
              type='number'
              placeholder='Idade máxima (opcional)'
              {...register('maxAge', {
                setValueAs: (v) => (v === null || v === '' ? null : Number(v)),
              })}
            />
            {errors.maxAge && (
              <p className='text-red-600 text-sm'>{errors.maxAge.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Professor */}
      <div className='grid gap-1'>
        <Label className='font-semibold font-poppins'>Professor</Label>

        <Controller
          control={control}
          name='instructor'
          render={({ field }) => (
            <SelectInstructor
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
        {errors.instructor && (
          <p className='text-red-600 text-sm'>{errors.instructor.message}</p>
        )}
      </div>

      {/* Horários */}
      <div className='grid gap-2'>
        <Label className='font-semibold font-poppins'>Horários da turma</Label>

        <div className='space-y-3'>
          {fields.map((field, index) => (
            <div key={field.id} className='grid grid-cols-2 gap-2 items-center'>
              <Controller
                control={control}
                name={`schedules.${index}.dayOfWeek`}
                render={({ field }) => (
                  <DayOfWeekSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.schedules?.[index]?.dayOfWeek?.message}
                  />
                )}
              />

              <div className='flex gap-2'>
                <Input
                  type='time'
                  {...register(`schedules.${index}.time`)}
                  defaultValue='10:30'
                  className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
                />
                <Button
                  type='button'
                  variant='destructive'
                  onClick={() => remove(index)}
                >
                  Remover
                </Button>
              </div>

              {/* {errors.schedules?.[index]?.dayOfWeek && (
                <p className='text-red-600 text-sm'>
                  {errors.schedules[index]?.dayOfWeek?.message}
                </p>
              )} */}
              {errors.schedules?.[index]?.time && (
                <p className='text-red-600 text-sm'>
                  {errors.schedules[index]?.time?.message}
                </p>
              )}
            </div>
          ))}

          <div>
            <Button
              type='button'
              variant='outline'
              onClick={() => append({ dayOfWeek: '', time: '' })}
            >
              <IconPlus />
              Adicionar horário
            </Button>
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className='flex justify-end gap-3'>
        <Button type='button' variant='outline'>
          Cancelar
        </Button>
        <Button type='submit' disabled={isPending}>
          {isPending && <Spinner />}
          {isPending ? 'Cadastrando...' : 'Cadastrar turma'}
        </Button>
      </div>
    </form>
  )
}
