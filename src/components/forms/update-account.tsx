'use client'

import { Card, CardContent } from '../ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'
import Link from 'next/link'
import { useUserData } from '@/hooks/use-user'
import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { updateUserData } from '@/http/user/update'

export const updateAccountSchema = z.object({
  username: z.string().min(3, 'O nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
})

export type UpdateAccountFormData = z.infer<typeof updateAccountSchema>

type UpdateAccountFormProps = {
  isAdmin: boolean
}

export function UpdateAccountForm({ isAdmin }: UpdateAccountFormProps) {
  const [isPending, startTransition] = useTransition()
  const { user: userData, loading } = useUserData()
  const [userId, setUserId] = useState('')

  const user = {
    id: userData?.id ?? 'Id do usuário',
    name: userData?.username ?? 'User',
    email: userData?.email ?? 'Email',
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateAccountFormData>({
    resolver: zodResolver(updateAccountSchema),
    mode: 'onChange',
    defaultValues: {
      username: user.name ?? 'Carregando...',
      email: user.email ?? 'Carregando...',
    },
  })

  useEffect(() => {
    if (userData) {
      reset({
        username: userData.username,
        email: userData.email,
      })
      setUserId(userData.id)
    }
  }, [userData, reset])

  async function onSubmit(data: UpdateAccountFormData) {
    startTransition(async () => {
      const response = await updateUserData(userId, data)

      if (response.status === 'success') {
        toast.success(response.message)
      } else {
        toast.error(response.message)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent className='gap-4 grid'>
          <div className='grid gap-6 lg:grid-cols-2'>
            <div className='grid gap-1'>
              <Label htmlFor='email' className='font-semibold font-poppins'>
                Nome
              </Label>
              <Input
                id='name'
                disabled={!isAdmin}
                placeholder='Nome de usuário'
                {...register('username')}
              />
              {errors.username && (
                <p className='text-sm text-red-600'>
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className='grid gap-1'>
              <Label htmlFor='email' className='font-semibold font-poppins'>
                Email
              </Label>
              <Input
                id='email'
                type='email'
                disabled={!isAdmin}
                placeholder='m@example.com'
                {...register('email')}
              />
              {errors.email && (
                <p className='text-sm text-red-600'>{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className='flex justify-start gap-3'>
            <Button
              type='button'
              variant='outline'
              disabled={isPending || !isAdmin}
            >
              Cancelar
            </Button>
            <Button type='submit' disabled={isPending || !isAdmin}>
              {isPending && <Spinner />}
              {isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
          <div className='flex justify-start gap-3'>
            <Link
              href='/forgot-password/send-email'
              className='ml-auto text-sm underline-offset-2 underline font-poppins'
            >
              Alterar senha
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
