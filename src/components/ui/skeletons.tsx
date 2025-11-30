import { Skeleton } from '@/components/ui/skeleton'
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

export function NavUserSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='flex items-center space-x-2 cursor-not-allowed'
        >
          <Skeleton className='size-10 rounded-lg' />
          <div className='grid flex-1 space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-3 w-3/4' />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

function ClassCardSkeleton() {
  return (
    <Card className='@container/card mb-4'>
      <CardHeader className='flex justify-between items-start'>
        <div className='space-y-2'>
          <Skeleton className='h-6 w-[180px]' />
          <Skeleton className='h-4 w-[140px]' />
        </div>

        <div className='flex items-center gap-3'>
          <Skeleton className='h-5 w-5 rounded-md' />
          <Skeleton className='h-5 w-5 rounded-md' />
        </div>
      </CardHeader>

      <CardContent className='grid gap-3 text-sm'>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-4 rounded-full' />
          <Skeleton className='h-4 w-[240px]' />
        </div>

        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-4 rounded-full' />
          <Skeleton className='h-4 w-[200px]' />
        </div>

        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-4 rounded-full' />
          <Skeleton className='h-4 w-[160px]' />
        </div>
      </CardContent>
    </Card>
  )
}

export function ClassesListSkeleton() {
  return (
    <div className='space-y-6'>
      {Array.from({ length: 4 }).map((_, index) => (
        <ClassCardSkeleton key={index} />
      ))}
    </div>
  )
}

function StudentCardSkeleton() {
  return (
    <Card className='mb-4 p-0'>
      <CardContent className='flex justify-between items-center px-3 py-3'>
        <div className='flex items-center gap-4'>
          {/* Avatar */}
          <Skeleton className='h-8 w-8 rounded-lg' />

          {/* Nome */}
          <Skeleton className='h-4 w-32' />
        </div>

        {/* Faixa e Grau */}
        <Skeleton className='h-4 w-24' />
      </CardContent>
    </Card>
  )
}

export function StudentListSkeleton() {
  return (
    <div className='space-y-6'>
      {Array.from({ length: 10 }).map((_, index) => (
        <StudentCardSkeleton key={index} />
      ))}
    </div>
  )
}

// Componente para o cabeçalho (Header)
function StudentHeaderSkeleton() {
  return (
    <CardHeader className='flex items-center justify-between'>
      <div className='flex items-center gap-4'>
        {/* Avatar e Nome */}
        <Skeleton className='h-12 w-12 rounded-full' />
        <div className='flex flex-col'>
          <Skeleton className='h-6 w-48' />
          <Skeleton className='h-4 w-32 mt-1' />
        </div>
      </div>
      {/* Badge de Frequência */}
      <Skeleton className='h-6 w-20' />
    </CardHeader>
  )
}

// Componente para o grid de informações (Content)
function StudentInfoGridSkeleton() {
  return (
    <CardContent>
      {/* Grid de Informações Pessoais */}
      <div className='grid lg:grid-cols-2 gap-x-8 gap-y-4 text-sm'>
        {/* Simula 7 pares de label/valor */}
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className='flex lg:flex-col space-x-1'>
            <Skeleton className='h-4 w-24 font-semibold' />
            <Skeleton className='h-4 w-40 mt-1' />
          </div>
        ))}
      </div>

      {/* Progresso da Faixa (BeltProgress) */}
      <div className='flex flex-col gap-2 w-full mt-6'>
        <div className='flex justify-between items-center'>
          <Skeleton className='h-4 w-36' />
          <Skeleton className='h-4 w-20' />
        </div>
        <Skeleton className='h-3 w-full' />
      </div>
    </CardContent>
  )
}

// Componente para o rodapé de ações (Footer)
function StudentActionFooterSkeleton() {
  return (
    <CardFooter className='flex w-full justify-between items-center'>
      {/* Botões de Ação (Graduar e Promover) */}
      <div className='flex gap-3'>
        <Skeleton className='h-10 w-32' /> {/* Graduar Aluno */}
        <Skeleton className='h-10 w-44' /> {/* Promover a Instrutor */}
      </div>
      {/* Ícones de Ação (Editar e Deletar) */}
      <div className='flex items-center gap-3 h-10'>
        <Skeleton className='size-6' />
        <Skeleton className='size-6' />
      </div>
    </CardFooter>
  )
}

export function StudentDetailsSkeleton() {
  return (
    <Card className='animate-pulse'>
      <StudentHeaderSkeleton />
      <StudentInfoGridSkeleton />
      <StudentActionFooterSkeleton />
    </Card>
  )
}
