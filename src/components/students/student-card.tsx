import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { beltToPtBr, getUserInitials } from '@/lib/utils'
import Link from 'next/link'

type StudentCardProps = {
  id: string
  title: string
  belt: Belt
  grade: number
}

export function StudentCard(props: StudentCardProps) {
  const initials = getUserInitials(props.title)
  const belt = beltToPtBr(props.belt)

  return (
    <Link href={`/dashboard/students/${props.id}/details`}>
      <Card className='cursor-pointer hover:shadow-lg transition-shadow mb-4 p-0'>
        <CardContent className='flex justify-between items-center px-3 py-3'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-8 w-8 rounded-lg grayscale'>
              <AvatarImage alt='Ismael Henrique' />
              <AvatarFallback className='size-8 rounded-full bg-zinc-800 text-white text-lg'>
                {initials}
              </AvatarFallback>
            </Avatar>

            <CardTitle className='font-poppins font-semibold text-base'>
              {props.title}
            </CardTitle>
          </div>
          <span className='text-neutral-500 text-sm'>
            Faixa {belt} | Grau {props.grade}
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
