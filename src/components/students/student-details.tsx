import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '../ui/button'
import {
  IconActivity,
  IconCirclePlusFilled,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Progress } from '@/components/ui/progress'
import { Badge } from '../ui/badge'

// Exemplo de componente para exibir a faixa
function BeltProgress({
  belt,
  degree,
  currentClasses,
  requiredClasses,
}: {
  belt: string
  degree: number
  currentClasses: number
  requiredClasses: number
}) {
  const progress = Math.min((currentClasses / requiredClasses) * 100, 100)

  return (
    <div className='flex flex-col gap-2 w-full mt-4'>
      <div className='flex justify-between items-center'>
        <span className='font-semibold'>
          {belt} - Grau {degree}
        </span>
        <span className='text-sm text-muted-foreground'>
          {currentClasses}/{requiredClasses} treinos
        </span>
      </div>
      <Progress value={progress} className='h-3' />
    </div>
  )
}

export function StudentDetails() {
  return (
    <Card className='@container/card'>
      <CardHeader className='flex items-center justify-between'>
       <div  className='flex items-center gap-4'>
          <Avatar className='h-12 w-12 rounded-lg grayscale'>
            <AvatarImage src='' alt='Ismael Henrique' />
            <AvatarFallback className='size-12 rounded-full bg-zinc-800 text-white text-lg'>
              IH
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <CardTitle className='lg:text-2xl text-xl font-semibold tabular-nums'>
              Ismael Henrique
            </CardTitle>
            <span className='text-sm text-muted-foreground'>
              Aluno ID: 123456
            </span>
          </div>
        </div>
        <CardAction>
          <Badge variant='outline' className='h-6 text-sm'>
            <IconActivity className='size-6 text-sm' />
            <span className='text-sm font-semibold'>46 treino(s)</span>
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className='grid lg:grid-cols-2 gap-x-8 gap-y-4 text-sm'>
          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>CPF:</span>
            <span>123.456.789-00</span>
          </div>

          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>Data de Nascimento:</span>
            <span>01/01/2000</span>
          </div>

          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>Telefone:</span>
            <span>(11) 98765-4321</span>
          </div>

          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>Endereço:</span>
            <span>Rua Exemplo, 123 - São Paulo/SP</span>
          </div>

          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>Graduação:</span>
            <span>Faixa Azul - 2º Grau</span>
          </div>

          <div className='flex lg:flex-col space-x-1'>
            <span className='font-semibold'>Responsável:</span>
            <span>Maria Henrique (Mãe)</span>
          </div>
        </div>

        {/* Componente da Faixa */}
        <BeltProgress
          belt='Faixa Branca'
          degree={3}
          currentClasses={12}
          requiredClasses={30}
        />
      </CardContent>

      <CardFooter className='flex w-full justify-between items-center'>
        <CardAction>
          <Button className='bg-primary text-primary-foreground hover:bg-primary/90 w-full'>
            <IconCirclePlusFilled />
            <span>Graduar Aluno</span>
          </Button>
        </CardAction>
        <div className='space-x-3 h-10'>
          <Tooltip>
            <TooltipTrigger>
              <IconPencil className='ml-auto size-6 cursor-pointer' />
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <IconTrash className='ml-auto size-6 cursor-pointer' />
            </TooltipTrigger>
            <TooltipContent>
              <p>Deletar</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardFooter>
    </Card>
  )
}
