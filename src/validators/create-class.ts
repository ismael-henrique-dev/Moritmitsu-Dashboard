import { z } from 'zod'

// A função auxiliar não está sendo usada, mas vou mantê-la.
const toNumberOrUndefined = (val: number) => {
  if (val === null || val === undefined) return null
  if (typeof val === 'number' && isNaN(val)) return null
  return val
}

export const createClassFormSchema = z
  .object({
    name: z.string().min(3, 'O nome da turma deve ter no mínimo 3 caracteres.'),
    minAge: z
      .number({
        error: 'A idade mínima é obrigatória.',
      })
      .min(4, 'Idade mínima é de 4 anos.'),

    maxAge: z
      .union([z.number().min(0, 'Informe um número válido.'), z.null()])
      .optional(), // .optional() significa que o valor pode ser number | null | undefined
    schedules: z
      .array(
        z.object({
          dayOfWeek: z.string().nonempty('Selecione o dia da semana.'),
          time: z.string().nonempty('Informe o horário.'),
        })
      )
      .min(1, 'Adicione pelo menos um horário.'),
    instructor: z.string().nonempty('Selecione um professor.'),
  })
  // 1. Se minAge < 12 → exige maxAge (que deve ser um número)
  .refine(
    (data) => {
      // Se minAge >= 12, a regra não se aplica (passa)
      if (data.minAge >= 12) {
        return true
      }
      // Se minAge < 12, maxAge DEVE ser um número.
      return typeof data.maxAge === 'number'
    },
    {
      message:
        'Se a idade mínima for menor que 12, a idade máxima é obrigatória.',
      path: ['maxAge'],
    }
  )
  // 2. Se maxAge informado (é um número) → deve ser > minAge
  .refine(
    (data) => {
      // Se maxAge não foi informado (não é um número), a regra não se aplica (passa)
      if (typeof data.maxAge !== 'number') {
        return true
      }
      // Se foi informado, deve ser maior que minAge
      return data.maxAge > data.minAge
    },
    {
      message: 'A idade máxima deve ser maior que a idade mínima.',
      path: ['maxAge'],
    }
  )

export type CreateClassFormData = z.infer<typeof createClassFormSchema>
