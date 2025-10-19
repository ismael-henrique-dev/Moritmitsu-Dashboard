import { LoginForm } from '@/components/forms/login-form'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Login',
}

export default function LoginPage() {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='bg-morimitsu-red relative hidden w-full h-full lg:flex items-center justify-center'>
        <Image
          src='/logo_morimtsu.png'
          alt='Morimtisu Logo'
          className='h-64 w-64 object-cover dark:brightness-[0.2] dark:grayscale'
          width={256}
          height={256}
        />
      </div>
      <div className='flex flex-col gap-4 md:p-10'>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full md:max-w-md'>
            <div className='w-full lg:hidden flex items-center justify-center mb-6'>
              <Image
                src='/logo_morimtsu.png'
                alt='Morimtisu Logo'
                className='h-40 w-40 object-cover dark:brightness-[0.2] dark:grayscale'
                width={160}
                height={160}
              />
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
