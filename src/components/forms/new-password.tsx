'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '../ui/password-input'
import { useTransition } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { LoginFormData, loginFormSchema } from '@/validators/login'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { login } from '@/http/auth/login'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'

export function NewPasswordForm() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: 'onChange',
    resolver: zodResolver(loginFormSchema),
  })

  const handleLoginUser = (data: LoginFormData) => {
    startTransition(async () => {
      const response = await login(data)

      if (response.status === 'success') {
        toast.success(response.message)
        redirect('/dashboard')
      } else {
        toast.error(response.message)
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleLoginUser)}
      className='flex flex-col gap-6 p-5 pt-0'
    >
      <div className='flex flex-col items-center gap-1'>
        <h1 className='font-poppins text-2xl font-semibold text-left'>
          Entre na sua conta
        </h1>
        <p className='font-poppins text-muted-foreground lg:text-base text-sm'>
          Insira uma nova senha nos campos abaixo.
        </p>
      </div>
      <div className='grid gap-6'>
        <div className='grid gap-1'>
          <Label htmlFor='email' className='font-semibold font-poppins'>
            Nova senha
          </Label>
          <PasswordInput
            id='email'
            placeholder='Digite sua nova senha'
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <p className='text-red-700 text-sm'>{errors.email.message}</p>
          )}
        </div>
        <div className='grid gap-1'>
          <Label htmlFor='password' className='font-semibold font-poppins'>
            Confirmar senha
          </Label>

          <PasswordInput
            id='password'
            placeholder='Confirme sua nova senha'
            aria-invalid={!!errors.password}
            {...register('password')}
          />
          {errors.password && (
            <p className='text-red-700 text-sm'>{errors.password.message}</p>
          )}
        </div>

        <Button
          type='submit'
          className='w-full cursor-pointer'
          disabled={isPending}
        >
          {isPending && <Spinner />}
          {isPending ? 'Entrando...' : 'Entrar'}
        </Button>

        <Button
          type='button'
          variant='outline'
          onClick={handleBack}
          className='w-full cursor-pointer'
        >
          Voltar
        </Button>
      </div>
    </form>
  )
}
