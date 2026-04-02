import { z } from 'zod'

export type IPageBlogSettingResponse = z.infer<typeof PageBlogSettingResponseSchema>
export const PageBlogSettingResponseSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  seo_meta: z.object({
    title: z.string().nullable(),
    description: z.string().nullable(),
  }).nullish(),
  locale: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  publishedAt: z.coerce.date(),
})
