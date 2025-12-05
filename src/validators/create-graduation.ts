import { z } from 'zod'

export const createGraduationFormSchema = z.object({
  date: z.string({
    error: 'A data de nascimento é obrigatória.',
  }),
  belt: z.string({ error: 'Selecione a faixa.' }),
  grade: z.string({ error: 'Selecione o grau.' }),
})

export type CreateGraduationFormData = z.infer<
  typeof createGraduationFormSchema
>
