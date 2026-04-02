import z from 'zod'

export type IFileFormat = z.infer<typeof FileFormatSchema>;
export const FileFormatSchema = z.object({
  name: z.string(),
  url: z.string(),
  width: z.number(),
  height: z.number(),
})

export type IFileResponse = z.infer<typeof FileResponseSchema>;
export const FileResponseSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  name: z.string(),
  alternativeText: z.string().nullable(),
  caption: z.string().nullable(),
  width: z.number().nullable(),
  height: z.number().nullable(),
  url: z.string(),
  formats: z.object({
    large: FileFormatSchema.optional(),
    medium: FileFormatSchema.optional(),
    small: FileFormatSchema.optional(),
    thumbnail: FileFormatSchema.optional(),
  }).nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  publishedAt: z.coerce.date(),
}).transform((data) => {
  if (!data.width) {
    return {
      ...data,
      srcset: undefined,
    }
  }

  let srcset = `${data.url} ${data.width}w`
  
  if (data.formats) {
    srcset += ', ' + Object.values(data.formats)
      .filter((f): f is z.infer<typeof FileFormatSchema> => !!f)
      .map((f) => `${f.url} ${f.width}w`)
      .join(', ')
  }

  return {
    ...data,
    srcset: srcset,
  }
})