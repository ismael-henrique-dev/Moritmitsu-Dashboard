import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import Link from 'next/link'

export function SendCodeForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-2xl font-bold'>Recuperação de senha</h1>
        <p className='text-muted-foreground text-sm text-left'>
          Informe o código de confirmação abaixo.
        </p>
      </div>
      <div className='grid gap-6'>
        <div className='grid gap-3'>
          <Label htmlFor='email'>Código</Label>

          <InputOTP maxLength={6} id='code'>
            <InputOTPGroup className='grid w-full grid-cols-6'>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button type='submit' className='w-full'>
          Enviar
        </Button>
      </div>
      <Button variant='outline' className='w-full cursor-pointer'>
        <Link href='/forgot-password/send-email'>Voltar</Link>
      </Button>
    </form>
  )
}
