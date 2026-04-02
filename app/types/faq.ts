import z from 'zod'

export type IFaqResponse = z.infer<typeof FaqResponseSchema>
export const FaqResponseSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  seq: z.number(),
  question: z.string(),
  answer: z.string(),
  locale: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  publishedAt: z.coerce.date(),
})