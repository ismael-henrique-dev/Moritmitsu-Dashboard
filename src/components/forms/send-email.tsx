'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

export function SendEmailForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <form className={cn('flex flex-col gap-6 p-5 pt-0', className)} {...props}>
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='font-poppins text-2xl font-semibold text-left'>
          Recuperação de senha
        </h1>
        <p className='font-poppins text-muted-foreground lg:text-base text-sm text-left'>
          Insira seu e-mail abaixo para receber o código de verificação.
        </p>
      </div>
      <div className='grid gap-6'>
        <div className='grid gap-3'>
          <Label htmlFor='email' className='font-semibold font-poppins'>
            Email
          </Label>
          <Input id='email' type='email' placeholder='m@example.com' required />
        </div>
        <Button type='submit' className='w-full'>
          Enviar
        </Button>
      </div>
      <Button
        onClick={handleBack}
        variant='outline'
        className='w-full cursor-pointer'
      >
        Voltar
      </Button>
    </form>
  )
}
