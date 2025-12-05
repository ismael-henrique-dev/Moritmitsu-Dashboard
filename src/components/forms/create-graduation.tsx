'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { SelectBelt, SelectDegree } from '@/components/ui/selects'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  CreateGraduationFormData,
  createGraduationFormSchema,
} from '@/validators/create-graduation'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { createGraduation } from '@/http/graduations/create'

export function CreateGraduationForm({ studentId }: { studentId: string }) {
  const [isPending, startTransition] = useTransition()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGraduationFormData>({
    resolver: zodResolver(createGraduationFormSchema),
    defaultValues: {
      belt: '',
      grade: '',
      date: '',
    },
  })

  const handleCreateGraduation = (data: CreateGraduationFormData) => {
    startTransition(async () => {
      console.log('Dados enviados do form:', data)

      const response = await createGraduation(data, studentId)

      if (response.status === 'success') {
        toast.success(response.message)
      } else {
        toast.error(response.message)
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateGraduation)}
      className='flex flex-col gap-1'
    >
      <div className='grid grid-cols-2 gap-4'>
        <div className='grid gap-1'>
          <Label className='font-semibold font-poppins'>Faixa</Label>
          <Controller
            control={control}
            name='belt'
            render={({ field }) => (
              <SelectBelt value={field.value} onValueChange={field.onChange} />
            )}
          />
          {errors.belt && (
            <p className='text-red-600 text-sm'>Selecione uma faixa</p>
          )}
        </div>

        <div className='grid gap-1'>
          <Label className='font-semibold font-poppins'>Grau</Label>
          <Controller
            control={control}
            name='grade'
            render={({ field }) => (
              <SelectDegree
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
          {errors.grade && (
            <p className='text-red-600 text-sm'>Selecione um grau</p>
          )}
        </div>
      </div>

      <div className='grid gap-4 mt-2'>
        <div className='grid gap-1'>
          <Label className='font-semibold font-poppins'>Data</Label>

          <Input
            type='date'
            className='lg:w-full bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
            {...register('date')}
          />

          {errors.date && (
            <p className='text-red-600 text-sm'>Informe a data</p>
          )}
        </div>
      </div>

      <DialogFooter className='flex justify-end gap-3 mt-4'>
        <DialogClose asChild>
          <Button variant='outline'>Cancelar</Button>
        </DialogClose>

        {/* <DialogClose asChild> */}
          <Button
            type='submit'
            className='text-white bg-black hover:bg-black/90 py-2 px-3 gap-2'
            disabled={isPending}
          >
            <span className='font-poppins font-medium'>Graduar</span>
          </Button>
        {/* </DialogClose> */}
      </DialogFooter>
    </form>
  )
}
