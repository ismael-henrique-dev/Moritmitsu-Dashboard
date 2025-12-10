'use client'

import { Card, CardContent } from '../ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'
import Link from 'next/link'
import { useUserData } from '@/hooks/use-user'

export function UpdateAccountForm() {
  const { user: userData, loading } = useUserData()

  const user = {
    name: userData?.username ?? 'User',
    email: userData?.email ?? 'Email',
  }
  
  const isPending = false

  return (
    <form action=''>
      <Card>
        <CardContent className='gap-4 grid'>
          <div className='grid gap-6 lg:grid-cols-2'>
            <div className='grid gap-1'>
              <Label htmlFor='email' className='font-semibold font-poppins'>
                Nome
              </Label>
              <Input
                id='email'
                type='text'
                defaultValue={user.name}
                placeholder='Nome de usuário'
              />
              {/* {errors.email && (
              <p className='text-red-700 text-sm'>{errors.email.message}</p>
            )} */}
            </div>
            <div className='grid gap-1'>
              <Label htmlFor='email' className='font-semibold font-poppins'>
                Email
              </Label>
              <Input
                id='email'
                type='email'
                defaultValue={user.email}
                placeholder='m@example.com'
              />
              {/* {errors.email && (
              <p className='text-red-700 text-sm'>{errors.email.message}</p>
            )} */}
            </div>
          </div>
          <div className='flex justify-start gap-3'>
            <Button type='button' variant='outline'>
              Cancelar
            </Button>
            <Button type='submit' disabled={isPending}>
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
