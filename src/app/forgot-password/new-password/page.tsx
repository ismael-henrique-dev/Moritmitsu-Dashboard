import { SendEmailForm } from '@/components/forms/send-email'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'New Password',
}

export default function SendEmail() {
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
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-md'>
            <div className='w-full lg:hidden flex items-center justify-center mb-6'>
              <Image
                src='/logo_morimtsu.png'
                alt='Image'
                className='h-40 w-40 object-cover dark:brightness-[0.2] dark:grayscale'
                width={200}
                height={200}
              />
            </div>
            <SendEmailForm />
          </div>
        </div>
      </div>
    </div>
  )
}
