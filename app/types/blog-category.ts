import z from 'zod'

export type IBlogCategoryResponse = z.infer<typeof BlogCategoryResponseSchema>
export const BlogCategoryResponseSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  seq: z.number(),
  name: z.string(),
  slug: z.string().nullable(),
  seo_meta: z.object({
    title: z.string().nullable(),
    description: z.string().nullable(),
  }).nullish(),
  locale: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  publishedAt: z.coerce.date(),
})