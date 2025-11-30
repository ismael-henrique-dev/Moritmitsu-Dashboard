'use client'

import {
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IconActivity } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { StudentResult } from '@/lib/definitions'
import { getUserInitials } from '@/lib/utils'
import { BeltProgress } from './belt-progress'
import { beltToPtBr } from '@/lib/utils'

type StudentInfoGridProps = {
  basicInfo: Omit<StudentResult, 'personal_info'>
  personalInfo: StudentResult['personal_info']
}

export function StudentInfoGrid({
  personalInfo,
  basicInfo,
}: StudentInfoGridProps) {
  const belt = beltToPtBr(basicInfo.belt)

  function formatPhone(phone: string) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  function formatCPF(cpf: string): string {
    const cleaned = cpf.replace(/\D/g, '')

    return cleaned
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{2}).*/, '$1.$2.$3-$4')
  }

  return (
    <CardContent>
      <div className='grid lg:grid-cols-2 gap-x-8 gap-y-4 text-sm'>
        <InfoItem label='CPF' value={formatCPF(personalInfo.cpf)} />
        <InfoItem
          label='Data de Nascimento'
          value={new Date(personalInfo.date_of_birth).toLocaleDateString(
            'pt-BR'
          )}
        />
        <InfoItem
          label='Telefone'
          value={formatPhone(personalInfo.student_phone)}
        />
        <InfoItem label='Endereço' value={personalInfo.address} />
        <InfoItem label='Responsável' value={personalInfo.parent_name} />
        <InfoItem
          label='Telfone do responsável'
          value={formatPhone(personalInfo.parent_phone)}
        />
        <InfoItem label='Matrícula' value={basicInfo.ifce_enrollment} />
      </div>

      <BeltProgress
        belt={`Faixa ${belt}`}
        degree={basicInfo.grade}
        currentClasses={basicInfo.current_frequency}
        requiredClasses={basicInfo.total_frequency}
      />
    </CardContent>
  )
}

type InfoItemProps = {
  label: string
  value: string | number
}

export function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className='flex lg:flex-col space-x-1'>
      <span className='font-semibold font-poppins'>{label}:</span>
      <span className='font-poppins'>{value}</span>
    </div>
  )
}

// Recebe apenas o que precisa, em vez do objeto student inteiro.
type StudentHeaderProps = {
  fullName: string
  alias: string | null
  email: string
  totalFrequency: number
}

export function StudentHeader({
  fullName,
  alias,
  email,
  totalFrequency,
}: StudentHeaderProps) {
  return (
    <CardHeader className='flex items-center justify-between'>
      <div className='flex items-center gap-4'>
        <Avatar className='h-12 w-12 rounded-lg grayscale'>
          <AvatarImage src='' alt={fullName} />
          <AvatarFallback className='size-12 rounded-full bg-zinc-800 text-white text-lg'>
            {getUserInitials(fullName)}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <CardTitle className='lg:text-2xl text-xl font-semibold tabular-nums'>
            {fullName}
            {alias && `(${alias})`}
          </CardTitle>
          <span className='text-sm text-muted-foreground'>{email}</span>
        </div>
      </div>
      <CardAction>
        <Badge variant='outline' className='h-6 text-sm'>
          <IconActivity className='size-6 text-sm' />
          <span className='text-sm font-semibold'>
            {totalFrequency} treino(s)
          </span>
        </Badge>
      </CardAction>
    </CardHeader>
  )
}
