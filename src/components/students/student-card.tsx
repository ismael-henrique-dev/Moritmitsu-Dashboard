import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

type StudentCardProps = {
  id: string
  title: string
  belt: 'white'
  grade: number
}

export function StudentCard() {
  return (
    <Link href='/dashboard/students/1235/details'>
      <Card className='cursor-pointer hover:shadow-lg transition-shadow mb-4 p-0'>
        <CardContent className='flex justify-between items-center px-3 py-3'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-8 w-8 rounded-lg grayscale'>
              <AvatarImage alt='Ismael Henrique' />
              <AvatarFallback className='size-8 rounded-full bg-zinc-800 text-white text-lg'>
                IH
              </AvatarFallback>
            </Avatar>

            <CardTitle className='font-poppins font-semibold text-base'>
              Ismael Henrique
            </CardTitle>
          </div>
          <span className='text-neutral-500 text-sm'>
            Faixa Branca | Grau 2
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
