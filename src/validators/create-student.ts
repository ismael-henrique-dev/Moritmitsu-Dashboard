import { z } from 'zod'

export const createStudentFormSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome completo deve ter no mínimo 3 caracteres.')
    .max(100, 'O nome completo deve ter no máximo 100 caracteres.'),
  alias: z.string().optional(),

  email: z
    .string()
    .email('Digite um email válido.')
    .min(5, 'O email deve ter no mínimo 5 caracteres.'),

  cpf: z.string().regex(/^\d{11}$/, 'O CPF deve conter exatamente 11 dígitos.'),

  phone: z
    .string()
    .min(10, 'O telefone deve conter no mínimo 10 dígitos.')
    .max(15, 'O telefone deve conter no máximo 15 dígitos.'),

  parentName: z
    .string()
    .min(3, 'O nome do responsável deve ter no mínimo 3 caracteres.'),

  parentPhone: z
    .string()
    .min(10, 'O telefone do responsável deve conter no mínimo 10 dígitos.')
    .max(15, 'O telefone do responsável deve conter no máximo 15 dígitos.'),

  address: z
    .string()
    .min(5, 'O endereço deve ter no mínimo 5 caracteres.')
    .max(120, 'O endereço deve ter no máximo 120 caracteres.'),

  registrationIfce: z.number().optional(),

  currentAttendance: z
    .number({ error: 'A frequência atual deve ser um número.' })
    .min(0, 'A frequência atual não pode ser negativa.')
    .max(30, 'A frequência dos professores deve ser menor ou igual a 30.'),

  totalTrainings: z
    .number({ error: 'O total de treinos deve ser um número.' })
    .min(0, 'O total de treinos não pode ser negativo.')
    .optional(),

  belt: z.string().min(1, 'Selecione a faixa.'),
  degree: z.string().min(1, 'Selecione o grau.'),
  birthDate: z
    .date({
      error: 'A data de nascimento é obrigatória.',
    })
    .refine(
      (d) => d <= new Date(),
      'A data de nascimento não pode ser no futuro.'
    ),
})

export type CreateStudentFormData = z.infer<typeof createStudentFormSchema>
