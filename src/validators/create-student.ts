import { differenceInYears, min } from 'date-fns'
import { z } from 'zod'

export const createStudentFormSchema = z
  .object({
    name: z
      .string()
      .min(3, 'O nome completo deve ter no mínimo 3 caracteres.')
      .max(100, 'O nome completo deve ter no máximo 100 caracteres.'),
    alias: z.string().optional(),

    email: z
      .string()
      .email('Digite um email válido.')
      .min(5, 'O email deve ter no mínimo 5 caracteres.'),

    cpf: z
      .string({
        error: 'CPF é obrigatório.',
      })
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, '')
        return replacedDoc.length >= 11
      }, 'CPF deve conter no mínimo 11 caracteres.')
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, '')
        return !!Number(replacedDoc)
      }, 'CPF deve conter apenas números.'),

    phone: z
      .string({
        error: 'O telfone é obrigatório.',
      })
      .min(10, 'O telefone deve conter no mínimo 10 dígitos.')
      .max(15, 'O telefone deve conter no máximo 15 dígitos.'),

    parentName: z.string().optional(),

    parentPhone: z
      .string({
        error: 'O telefone do responsável é obrigatório.',
      })
      .optional(),

    address: z
      .string({ error: 'O endereço é obrigatório.' })
      .min(10, 'O endereço deve ter no mínimo 120 caracteres.')
      .max(120, 'O endereço deve ter no máximo 120 caracteres.'),

    registrationIfce: z
      .string()
      .regex(/^\d{14}$/, 'A matrícula deve conter exatamente 14 números.')
      .nullable(),

    currentAttendance: z
      .number({ error: 'A frequência é obrigatória.' })
      .min(0, 'A frequência atual não pode ser negativa.')
      .max(30, 'A frequência dos professores deve ser menor ou igual a 30.'),

    totalTrainings: z
      .number({ error: 'O total é obrigatório.' })
      .min(0, 'O total de treinos não pode ser negativo.')
      .optional(),

    belt: z.string({ error: 'Selecione a faixa.' }),
    degree: z.string({ error: 'Selecione o grau.' }),
    birthDate: z
      .string({
        error: 'A data de nascimento é obrigatória.',
      })
      .min(1, 'A data de nascimento é obrigatória.')
      .refine(
        (value) => {
          const date = new Date(value)
          return !isNaN(date.getTime()) && date <= new Date()
        },
        { message: 'A data de nascimento não pode ser no futuro.' }
      ),
  })
  .refine(
    (data) => {
      const birth = new Date(data.birthDate)
      const age = differenceInYears(new Date(), birth)
      if (age < 18) {
        return (
          data.parentName &&
          data.parentName.trim().length >= 3 &&
          data.parentPhone &&
          data.parentPhone.trim().length >= 10
        )
      }
      return true
    },
    {
      message:
        'Campos de responsável são obrigatórios para alunos menores de 18 anos.',
      path: ['parentName'], // ou ['parentPhone'], tanto faz — o ideal seria mostrar em um só
    }
  )

export type CreateStudentFormData = z.infer<typeof createStudentFormSchema>
