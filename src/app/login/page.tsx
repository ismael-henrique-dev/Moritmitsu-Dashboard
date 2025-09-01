import { LoginForm } from '@/components/login-form'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='bg-muted relative hidden w-full h-full lg:flex items-center justify-center'>
        <Image
          src='/logo_morimtsu.png'
          alt='Image'
          className='h-80 w-80 object-cover dark:brightness-[0.2] dark:grayscale'
          width={400}
          height={400}
        />
      </div>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <a href='#' className='flex items-center gap-2 font-medium'>
            <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-full'>
              <Image
                src='/logo_morimtsu.png'
                alt='Image'
                className='h-6 w-6 object-cover dark:brightness-[0.2] dark:grayscale'
                width={24}
                height={24}
              />
            </div>
            Morimitsu | Tradição Jiu-jitsu
          </a>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <div className='w-full lg:hidden flex items-center justify-center mb-6'>
              <Image
                src='/logo_morimtsu.png'
                alt='Image'
                className='h-40 w-40 object-cover dark:brightness-[0.2] dark:grayscale'
                width={200}
                height={200}
              />
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
