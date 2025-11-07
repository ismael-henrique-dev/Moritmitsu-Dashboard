import { z } from 'zod'

export const createClassFormSchema = z
  .object({
    name: z.string().min(3, 'O nome da turma deve ter no mínimo 3 caracteres.'),
    minAge: z
      .number({
        error: 'A idade mínima é obrigatória.',
      })

      .min(4, 'Idade mínima é de 4 anos.'),
    maxAge: z.number().nullable(),
    schedules: z
      .array(
        z.object({
          dayOfWeek: z.string().nonempty('Selecione o dia da semana.'),
          time: z.string().nonempty('Informe o horário.'),
        })
      )
      .min(1, 'Adicione pelo menos um horário.'),
    instructor: z.string({ error: 'Selecione um professor responsável.' }),
  })
  .superRefine((data, ctx) => {
    const { minAge, maxAge } = data

    // Se minAge não for um número válido, a validação base já falhou.
    if (typeof minAge !== 'number') {
      return
    }

    // --- LÓGICA DE VALIDAÇÃO ---

    if (maxAge && maxAge <= minAge) {
      console.log('Regra 1')

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Idade máxima deve ser maior que a idade mínima.',
        path: ['maxAge'],
      })
    }

    if (!maxAge && minAge < 12) {
      console.log('Regra 2')
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Idade máxima é obrigatória se a mínima for menor que 12.',
        path: ['maxAge'],
      })
    }

    if (maxAge && maxAge > 12 && maxAge <= minAge) {
      console.log('Regra 3')
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Idade máxima deve ser maior que a idade mínima.',
        path: ['maxAge'],
      })
    }
  })

export type CreateClassFormData = z.infer<typeof createClassFormSchema>
