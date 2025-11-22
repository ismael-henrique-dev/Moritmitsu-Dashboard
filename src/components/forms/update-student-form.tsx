'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '../ui/spinner'
import { toast } from 'sonner'
import {
  CreateStudentFormData,
  createStudentFormSchema,
} from '@/validators/create-student'
import { SelectBelt, SelectDegree } from '../ui/selects'
import { formatCpf, formatPhone } from '@/lib/utils'
import { updateStudent } from '@/http/students/update'
import { StudentResult } from '@/lib/definitions'

type UpdateStudentFormProps = {
  id: string
  student: StudentResult
}

export function UpdateStudentForm({ id, student }: UpdateStudentFormProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStudentFormData>({
    resolver: zodResolver(createStudentFormSchema),
    defaultValues: {
      registrationIfce: null,
      cpf: '',
    },
  })

  useEffect(() => {
  if (student) {
    reset({
      name: student.personal_info.full_name,
      birthDate: student.personal_info.date_of_birth.substring(0, 10), // para o input date
      alias: student.alias || '',
      email: student.email,
      cpf: student.personal_info.cpf,
      phone: student.personal_info.student_phone,
      parentName: student.personal_info.parent_name,
      parentPhone: student.personal_info.parent_phone,
      address: student.personal_info.address,
      registrationIfce: student.ifce_enrollment || null,
      currentAttendance: student.current_frequency,
      totalTrainings: student.total_frequency,
      belt: student.belt,
      degree: String(student.grade),
    })
  }
}, [student, reset])

  const handleCreateStudent = (data: CreateStudentFormData) => {
    startTransition(async () => {
      console.log(data)
      const response = await updateStudent(id, data)

      if (response.status === 'success') {
        toast.success(response.message)
        router.push('/dashboard/students')
      } else {
        toast.error(response.message)
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateStudent)}
      className='flex flex-col gap-6 p-5'
    >
      {/* Nome completo */}
      <div>
        <div className='grid lg:grid-cols-[1fr_auto] gap-4'>
          <div className='grid gap-1 col-span-'>
            <Label className='font-semibold font-poppins'>Nome completo</Label>
            <Input
              placeholder='Digite seu nome completo'
              {...register('name')}
            />

            {errors.name && (
              <p className='text-red-600 text-sm lg:hidden'>
                {errors.name.message}
              </p>
            )}
          </div>

          <div className='grid gap-1'>
            <Label className='font-semibold font-poppins'>
              Data de nascimento
            </Label>

            <Input
              type='date'
              className='lg:w-56 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
              {...register('birthDate')}
              defaultValue=''
            />
            {errors.birthDate && (
              <p className='text-red-600 text-sm lg:hidden'>
                {errors.birthDate.message}
              </p>
            )}
          </div>
        </div>
        {/* Errors */}
        <div className='grid w-full lg:grid-cols-[1fr_auto] gap-4'>
          <div className='lg:block w-full hidden'>
            {errors.name && (
              <p className='text-red-600 text-sm'>{errors.name.message}</p>
            )}
          </div>
          <div className='w-56 lg:block hidden'>
            {errors.birthDate && (
              <p className='text-red-600 text-sm'>{errors.birthDate.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Apelido e Email */}

      <div>
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
              <p className='text-red-600 text-sm lg:hidden'>
                {errors.alias.message}
              </p>
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
              <p className='text-red-600 text-sm lg:hidden'>
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Errors */}
        <div className='lg:grid grid-cols-2 gap-4 hidden'>
          <div>
            {errors.alias && (
              <p className='text-red-600 text-sm'>{errors.alias.message}</p>
            )}
          </div>
          <div>
            {errors.email && (
              <p className='text-red-600 text-sm'>{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* CPF e Telefone */}

      <div>
        <div className='grid grid-cols-2 gap-4'>
          <Controller
            control={control}
            name='cpf'
            render={({ field }) => (
              <div className='grid gap-1'>
                <Label className='font-semibold font-poppins'>CPF</Label>
                <Input
                  placeholder='Digite o CPF'
                  maxLength={14} // 000.000.000-00
                  value={field.value}
                  onChange={(e) => field.onChange(formatCpf(e.target.value))}
                />
              </div>
            )}
          />
          <div className='grid gap-1'>
            <Label className='font-semibold font-poppins'>Telefone</Label>
            <Controller
              control={control}
              name='phone'
              render={({ field }) => (
                <Input
                  placeholder='Digite o telefone'
                  maxLength={15}
                  value={field.value}
                  onChange={(e) => field.onChange(formatPhone(e.target.value))}
                />
              )}
            />
          </div>
        </div>
        {/* Errors */}
        <div className='grid grid-cols-2 gap-4'>
          <div>
            {errors.cpf && (
              <p className='text-red-600 text-sm'>{errors.cpf.message}</p>
            )}
          </div>
          <div>
            {errors.phone && (
              <p className='text-red-600 text-sm'>{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Responsável */}
      <div>
        <div className='grid lg:grid-cols-2 gap-4'>
          <div className='grid gap-1'>
            <Label className='font-semibold font-poppins'>Responsável</Label>
            <Input
              placeholder='Digite o nome do responsável'
              {...register('parentName')}
            />
            {errors.parentName && (
              <p className='text-red-600 text-sm lg:hidden'>
                {errors.parentName.message}
              </p>
            )}
          </div>
          <div className='grid gap-1'>
            <Label className='font-semibold font-poppins'>
              Telefone do responsável
            </Label>
            <Controller
              control={control}
              name='parentPhone'
              render={({ field }) => (
                <Input
                  placeholder='Digite o telefone'
                  maxLength={15}
                  value={field.value}
                  onChange={(e) => field.onChange(formatPhone(e.target.value))}
                />
              )}
            />
            {errors.parentPhone && (
              <p className='text-red-600 text-sm lg:hidden'>
                {errors.parentPhone.message}
              </p>
            )}
          </div>
        </div>
        {/* Errors */}
        <div className='lg:grid hidden w-full grid-cols-2 gap-4'>
          <div>
            {errors.parentName && (
              <p className='text-red-600 text-sm'>
                {errors.parentName.message}
              </p>
            )}
          </div>
          <div className='lg:block'>
            {errors.parentPhone && (
              <p className='text-red-600 text-sm'>
                {errors.parentPhone.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Endereço e Matrícula IFCE */}
      <div>
        <div className='grid lg:grid-cols-2 gap-4'>
          <div className='grid gap-1'>
            <Label className='font-semibold font-poppins'>Endereço</Label>
            <Input placeholder='Digite o endereço' {...register('address')} />
            {errors.address && (
              <p className='text-red-600 text-sm lg:hidden'>
                {errors.address.message}
              </p>
            )}
          </div>
          <div className='grid gap-1'>
            <Label className='font-semibold font-poppins'>
              Matrícula IFCE (não obrigatório)
            </Label>
            <Input
              placeholder='Digite a matrícula (caso tenha)'
              maxLength={14}
              {...register('registrationIfce', {
                setValueAs: (v) => (v === null || v === '' ? null : String(v)),
              })}
            />
            {errors.registrationIfce && (
              <p className='text-red-600 text-sm lg:hidden'>
                {errors.registrationIfce.message}
              </p>
            )}
          </div>
        </div>
        <div className='lg:grid hidden grid-cols-2 gap-4'>
          <div>
            {errors.address && (
              <p className='text-red-600 text-sm'>{errors.address.message}</p>
            )}
          </div>
          <div>
            {errors.registrationIfce && (
              <p className='text-red-600 text-sm'>
                {errors.registrationIfce.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Frequência e Total de treinos */}
      <div>
        {/* Errors */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='grid gap-1'>
            <Label className='font-semibold font-poppins'>
              Frequência atual
            </Label>
            <Input
              type='number'
              placeholder='Digite a frequência atual'
              {...register('currentAttendance', { valueAsNumber: true })}
            />
          </div>
          <div className='grid gap-1'>
            <Label className='font-semibold font-poppins'>
              Total de treinos
            </Label>
            <Input
              type='number'
              placeholder='Digite o total de treinos'
              {...register('totalTrainings', { valueAsNumber: true })}
            />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            {errors.currentAttendance && (
              <p className='text-red-600 text-sm'>
                {errors.currentAttendance.message}
              </p>
            )}
          </div>
          <div>
            {errors.totalTrainings && (
              <p className='text-red-600 text-sm'>
                {errors.totalTrainings.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Faixa e Grau */}
      <div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='grid gap-1'>
            <Label className='font-semibold font-poppins'>Faixa</Label>
            <Controller
              control={control}
              name='belt'
              render={({ field }) => (
                <SelectBelt
                  value={field.value}
                  defaultValue={student.belt} 
                  onValueChange={field.onChange}
                />
              )}
            />
          </div>
          <div className='grid gap-1'>
            <Label className='font-semibold font-poppins'>Grau</Label>
            <Controller
              control={control}
              name='degree'
              render={({ field }) => (
                <SelectDegree
                  value={field.value}
                  defaultValue={String(student.grade)} 
                  onValueChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            {errors.belt && (
              <p className='text-red-600 text-sm'>{errors.belt.message}</p>
            )}
          </div>
          <div>
            {errors.degree && (
              <p className='text-red-600 text-sm'>{errors.degree.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className='flex justify-end gap-3'>
        <Button type='button' variant='outline' onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button type='submit' disabled={isPending}>
          {isPending && <Spinner />}
          {isPending ? 'Editando...' : 'Editar aluno'}
        </Button>
      </div>
    </form>
  )
}
