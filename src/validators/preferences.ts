import z from 'zod'

export const preferenceSchema = z.object({
  id: z.string(),
  category: z.enum(['KIDS', 'INFANTO-JUVENIL', 'JUVENIL-ADULTO']),
  belt: z.string(), // ou z.nativeEnum(Belt) se vier enum
  minAge: z.number().nullable(),
  maxAge: z.number().nullable(),
  totalTrains: z.number(),
})
