import z from 'zod'

export const ENV = z
  .object({
    API_URL: z.string(),
  })
  .parse(process.env)
