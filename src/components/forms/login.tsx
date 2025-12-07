'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '../ui/password-input'
import { useTransition } from 'react'
import { redirect } from 'next/navigation'
import { LoginFormData, loginFormSchema } from '@/validators/login'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { login } from '@/http/auth/login'
import { Spinner } from '../ui/spinner'
import { toast } from 'sonner'
import Link from 'next/link'

export function LoginForm() {
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
          Insira seu e-mail abaixo para acessar sua conta.
        </p>
      </div>
      <div className='grid gap-6'>
        <div className='grid gap-1'>
          <Label htmlFor='email' className='font-semibold font-poppins'>
            Email
          </Label>
          <Input
            id='email'
            type='email'
            placeholder='m@example.com'
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <p className='text-red-700 text-sm'>{errors.email.message}</p>
          )}
        </div>
        <div className='grid gap-1'>
          <div className='flex items-center'>
            <Label htmlFor='password' className='font-semibold font-poppins'>
              Senha
            </Label>
            <Link
              href='/forgot-password/send-email'
              className='ml-auto text-sm underline-offset-2 underline font-poppins'
            >
              Esqueci a senha
            </Link>
          </div>
          <PasswordInput
            id='password'
            placeholder='Digite sua senha'
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
      </div>
    </form>
  )
}
