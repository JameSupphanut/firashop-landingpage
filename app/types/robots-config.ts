import z from 'zod'

export type IRobotsConfigResponse = z.infer<typeof RobotsConfigResponseSchema>
export const RobotsConfigResponseSchema = z.object({
  blockAll: z.boolean(),
  configs: z.array(
    z.object({
      name: z.string(),
      userAgent: z.object({
        name: z.string(),
      }).array(),
      allow: z.object({
        path: z.string(),
      }).array(),
      disallow: z.object({
        path: z.string(),
      }).array(),
      crawlDelay: z.number().nullable(),
    }),
  ),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  publishedAt: z.coerce.date(),
})
