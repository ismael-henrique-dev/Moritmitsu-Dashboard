'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '../ui/spinner'
import {
  createClassFormSchema,
  CreateClassFormData,
} from '@/validators/create-class'
import { createClass } from '@/http/classes/create'
import { toast } from 'sonner'
import {
  CreateStudentFormData,
  createStudentFormSchema,
} from '@/validators/create-student'
import { DatePicker } from '../attendances/date-picker'
import { SelectBelt, SelectDegree } from '../ui/selects'

export function CreateStudentForm() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStudentFormData>({
    resolver: zodResolver(createStudentFormSchema),
    defaultValues: {},
  })

  const handleCreateClass = (data: CreateStudentFormData) => {
    startTransition(async () => {
      console.log(data)
      // const response = await createClass(data)

      // if (response.status === 'success') {
      //   toast.success(response.message)
      //   router.push('/dashboard/students')
      // } else {
      //   toast.error(response.message)
      // }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateClass)}
      className='flex flex-col gap-6'
    >
      {/* Nome completo */}
      <div className='grid lg:grid-cols-[1fr_auto] gap-4'>
        <div className='grid gap-1 col-span-'>
          <Label className='font-semibold font-poppins'>Nome completo</Label>
          <Input placeholder='Digite seu nome completo' {...register('name')} />
          {errors.name && (
            <p className='text-red-600 text-sm'>{errors.name.message}</p>
          )}
        </div>

        <div className='grid gap-1'>
          <Label className='font-semibold font-poppins'>
            Data de nascimento
          </Label>
          <Controller
            control={control}
            name='birthDate'
            render={({ field }) => (
              <DatePicker
                value={field.value}
                onChange={field.onChange}
                error={errors.birthDate?.message}
              />
            )}
          />
          {errors.birthDate && (
            <p className='text-red-600 text-sm'>{errors.birthDate.message}</p>
          )}
        </div>
      </div>

      {/* Apelido e Email */}
      <div className='grid lg:grid-cols-2 gap-4'>
        <div className='grid gap-1'>
          <Label className='font-semibold font-poppins'>
            Apelido (não obrigatório)
          </Label>
          <Input
            placeholder='Digite seu apelido caso tenha'
            {...register('alias')}
          />
          {errors.alias && (
            <p className='text-red-600 text-sm'>{errors.alias.message}</p>
          )}
        </div>
        <div className='grid gap-1'>
          <Label className='font-semibold font-poppins'>Email</Label>
          <Input
            type='email'
            placeholder='Digite o email do aluno'
            {...register('email')}
          />
          {errors.email && (
            <p className='text-red-600 text-sm'>{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* CPF e Telefone */}
      <div className='grid grid-cols-2 gap-4'>
        <div className='grid gap-1'>
          <Label className='font-semibold font-poppins'>CPF</Label>
          <Input placeholder='Digite o CPF' {...register('cpf')} />
          {errors.cpf && (
            <p className='text-red-600 text-sm'>{errors.cpf.message}</p>
          )}
        </div>
        <div className='grid gap-1'>
          <Label className='font-semibold font-poppins'>Telefone</Label>
          <Input placeholder='Digite o telefone' {...register('phone')} />
          {errors.phone && (
            <p className='text-red-600 text-sm'>{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Responsável */}
      <div className='grid grid-cols-2 gap-4'>
        <div className='grid gap-1'>
          <Label className='font-semibold font-poppins'>Responsável</Label>
          <Input
            placeholder='Digite o nome do responsável'
            {...register('parentName')}
          />
          {errors.parentName && (
            <p className='text-red-600 text-sm'>{errors.parentName.message}</p>
          )}
        </div>
        <div className='grid gap-1'>
          <Label className='font-semibold font-poppins'>
            Telefone do responsável
          </Label>
          <Input
            placeholder='Digite o telefone do responsável'
            {...register('parentPhone')}
          />
          {errors.parentPhone && (
            <p className='text-red-600 text-sm'>{errors.parentPhone.message}</p>
          )}
        </div>
      </div>

      {/* Endereço e Matrícula IFCE */}
      <div className='grid lg:grid-cols-2 gap-4'>
        <div className='grid gap-1'>
          <Label className='font-semibold font-poppins'>Endereço</Label>
          <Input placeholder='Digite o endereço' {...register('address')} />
          {errors.address && (
            <p className='text-red-600 text-sm'>{errors.address.message}</p>
          )}
        </div>
        <div className='grid gap-1'>
          <Label className='font-semibold font-poppins'>
            Matrícula IFCE (não obrigatório)
          </Label>
          <Input
            type='number'
            placeholder='Digite a matrícula (caso tenha)'
            {...register('registrationIfce', { valueAsNumber: true })}
          />
          {errors.registrationIfce && (
            <p className='text-red-600 text-sm'>
              {errors.registrationIfce.message}
            </p>
          )}
        </div>
      </div>

      {/* Frequência e Total de treinos */}
      <div className='grid grid-cols-2 gap-4'>
        <div className='grid gap-1'>
          <Label className='font-semibold font-poppins'>Frequência atual</Label>
          <Input
            type='number'
            placeholder='Digite a frequência atual'
            {...register('currentAttendance', { valueAsNumber: true })}
          />
          {errors.currentAttendance && (
            <p className='text-red-600 text-sm'>
              {errors.currentAttendance.message}
            </p>
          )}
        </div>
        <div className='grid gap-1'>
          <Label className='font-semibold font-poppins'>Total de treinos</Label>
          <Input
            type='number'
            placeholder='Digite o total de treinos'
            {...register('totalTrainings', { valueAsNumber: true })}
          />
          {errors.totalTrainings && (
            <p className='text-red-600 text-sm'>
              {errors.totalTrainings.message}
            </p>
          )}
        </div>
      </div>

      {/* Faixa e Grau */}
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
            <p className='text-red-600 text-sm'>{errors.belt.message}</p>
          )}
        </div>
        <div className='grid gap-1'>
          <Label className='font-semibold font-poppins'>Grau</Label>
          <Controller
            control={control}
            name='degree'
            render={({ field }) => (
              <SelectDegree
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
          {errors.degree && (
            <p className='text-red-600 text-sm'>{errors.degree.message}</p>
          )}
        </div>
      </div>
      {/* Botões */}
      <div className='flex justify-end gap-3'>
        <Button type='button' variant='outline' onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button type='submit' disabled={isPending}>
          {isPending && <Spinner />}
          {isPending ? 'Cadastrando...' : 'Cadastrar aluno'}
        </Button>
      </div>
    </form>
  )
}
