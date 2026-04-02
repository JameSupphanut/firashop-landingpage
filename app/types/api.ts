import z from 'zod'

export type IAPIResponse<T> = z.infer<ReturnType<typeof APIResponseSchema<T>>>;
export const APIResponseSchema = <T>(dataSchema: z.ZodType<T>) => z.object({
  data: dataSchema.nullish(),
  meta: z.object({
    pagination: z.object({
      page: z.number(),
      pageSize: z.number(),
      pageCount: z.number(),
      total: z.number(),
    }).nullish(),
  }).nullish(),
  error: z.object({
    status: z.number(),
    name: z.string(),
    message: z.string(),
  }).nullish(),
})
