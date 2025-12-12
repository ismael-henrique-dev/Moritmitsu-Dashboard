import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { IconSchool } from '@tabler/icons-react'

export function AlertSelectClass() {
  return (
    <Alert variant='destructive'>
      <IconSchool />
      <AlertTitle>Selecione uma <strong>turma</strong> para realizar nova frequência</AlertTitle>
      <AlertDescription>
        Clique no select para selecionar uma turma e realizar uma nova frequência
      </AlertDescription>
    </Alert>
  )
}
