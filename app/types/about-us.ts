import z from 'zod'
import { FileResponseSchema } from './file'

export type IAboutUsResponse = z.infer<typeof AboutUsResponseSchema>
export const AboutUsResponseSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  company: z.string(),
  description: z.string(),
  contact: z.string(),
  email: z.string().nullable(),
  telephone: z.string().nullable(),
  facebookUrl: z.string().nullable(),
  xUrl: z.string().nullable(),
  instagramUrl: z.string().nullable(),
  lineUrl: z.string().nullable(),
  messengerUrl: z.string().nullable(),
  youtubeUrl: z.string().nullable(),
  tiktokUrl: z.string().nullable(),
  address: z.string(),
  openingHours: z.string(),
  image: FileResponseSchema.nullish(),
  button: z.object({
    name: z.string(),
    link: z.string(),
  }).nullish(),
  locale: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  publishedAt: z.coerce.date(),
})
