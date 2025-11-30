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
import {
  formatCpf,
  formatPhone,
  getUserInitials,
  beltToPtBr,
} from '@/lib/utils'
import { BeltProgress } from './belt-progress'

type StudentInfoGridProps = {
  basicInfo: Omit<StudentResult, 'personal_info'>
  personalInfo: StudentResult['personal_info']
}

export function StudentInfoGrid({
  personalInfo,
  basicInfo,
}: StudentInfoGridProps) {
  const belt = beltToPtBr(basicInfo.belt)

  return (
    <CardContent>
      <div className='grid lg:grid-cols-2 gap-x-8 gap-y-4 text-sm'>
        <InfoItem label='CPF' value={formatCpf(personalInfo.cpf) as string} />
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
        requiredClasses={5}
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
      <div className='flex items-center gap-2'>
        <Avatar className='h-10 w-10 rounded-lg grayscale'>
          <AvatarImage src='' alt={fullName} />
          <AvatarFallback className='size-10 rounded-full bg-black text-white font-medium font-poppins'>
            {getUserInitials(fullName)}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <CardTitle className='font-medium font-poppins'>
            {fullName}
            {alias && `(${alias})`}
          </CardTitle>
          <span className='text-xs text-neutral-500 font-medium font-poppins'>
            {email}
          </span>
        </div>
      </div>
      <CardAction>
        <Badge variant='outline'>
          <IconActivity className='size-4 text-sm text-neutral-600' />
          <span className='text-sm font-semibold font-poppins text-neutral-600'>
            {totalFrequency} treino(s)
          </span>
        </Badge>
      </CardAction>
    </CardHeader>
  )
}
