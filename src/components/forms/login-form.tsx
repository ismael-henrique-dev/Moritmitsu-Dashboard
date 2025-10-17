import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { PasswordInput } from '../ui/password-input'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6 p-5', className)} {...props}>
      <div className='flex flex-col items-center gap-1'>
        <h1 className='font-poppins text-2xl font-semibold text-left'>
          Entre na sua conta
        </h1>
        <p className='font-poppins text-muted-foreground text-balance'>
          Insira seu e-mail abaixo para acessar sua conta.
        </p>
      </div>
      <div className='grid gap-6'>
        <div className='grid gap-1'>
          <Label htmlFor='email' className='font-semibold font-poppins'>
            Email
          </Label>
          <Input id='email' type='email' placeholder='m@example.com' required />
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
            required
            placeholder='Digite sua senha'
          />
        </div>
        <Button type='submit' className='w-full cursor-pointer'>
          Entrar
        </Button>
      </div>
    </form>
  )
}
