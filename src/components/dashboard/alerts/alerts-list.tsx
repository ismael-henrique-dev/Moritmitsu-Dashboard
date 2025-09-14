import { Card, CardContent } from '@/components/ui/card'
import { IconAward, IconCake } from '@tabler/icons-react'

const students = [
  {
    id: 1,
    name: 'João',
    birthday: '2005-09-15',
    belt: 'Azul',
    eligibleForPromotion: true,
  },
  {
    id: 2,
    name: 'Maria',
    birthday: '2006-09-03',
    belt: 'Branca',
    eligibleForPromotion: false,
  },
  {
    id: 3,
    name: 'Carlos',
    birthday: '2005-09-10',
    belt: 'Roxa',
    eligibleForPromotion: true,
  },
]

export function AlertsList() {
  const today = new Date()
  const currentMonth = today.getMonth() + 1 // 0-11 -> 1-12

  // Filtra aniversariantes do mês
  const birthdaysThisMonth = students.filter((student) => {
    const month = new Date(student.birthday).getMonth() + 1
    return month === currentMonth
  })

  // Filtra alunos aptos à graduação
  const readyForPromotion = students.filter(
    (student) => student.eligibleForPromotion
  )

  return (
    <div className='grid lg:grid-cols-2 gap-2'>
      {birthdaysThisMonth.length > 0 && (
        <Card className=''>
          <CardContent className='flex flex-col gap-1'>
            <div className='flex items-center gap-2 mb-1'>
              <IconCake className='text-yellow-700' />
              <span className='font-medium text-yellow-900'>
                Aniversariantes do mês
              </span>
            </div>
            <ul className='text-sm text-gray-700'>
              {birthdaysThisMonth.map((s) => (
                <li key={s.id} className='list-none'>
                  {s.name} –{' '}
                  {new Date(s.birthday).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                  })}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {readyForPromotion.length > 0 && (
        <Card className='bg-green-50'>
          <CardContent className='flex flex-col gap-1'>
            <div className='flex items-center gap-2 mb-1'>
              <IconAward className='text-green-700' />
              <span className='font-medium text-green-900'>
                Alunos aptos à graduação
              </span>
            </div>
            <ul className='text-sm text-gray-700'>
              {readyForPromotion.map((s) => (
                <li key={s.id}>
                  {s.name} – Faixa {s.belt}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* {birthdaysThisMonth.length === 0 && readyForPromotion.length === 0 && (
        <span className='text-sm text-gray-500'>Sem avisos no momento</span>
      )} */}
    </div>
  )
}
