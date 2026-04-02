import z from 'zod'
import { BlogCategoryResponseSchema } from './blog-category'
import { FileResponseSchema } from './file'

export type IBlogResponse = z.infer<typeof BlogResponseSchema>
export const BlogResponseSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string(),
  content: z.string(),
  category: BlogCategoryResponseSchema.nullish(),
  cover: FileResponseSchema.nullish(),
  slug: z.string(),
  seo_meta: z.object({
    title: z.string().nullable(),
    description: z.string().nullable(),
  }).nullish(),
  locale: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  publishedAt: z.coerce.date(),
})