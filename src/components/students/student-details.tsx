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
  IconCirclePlusFilled,
  IconDotsVertical,
  IconPencil,
  IconTrash,
  IconTrashFilled,
  IconTrashOff,
  IconTrashX,
} from '@tabler/icons-react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function StudentDetails() {
  return (
    <Card className='@container/card'>
      <CardHeader className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
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
      </CardContent>
      <CardFooter>
        <CardAction>
          <Button className='bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear w-full'>
            <IconCirclePlusFilled />
            <span>Graduar Aluno</span>
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  )
}
