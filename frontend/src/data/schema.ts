import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const invoiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.enum(["draft", "late", "paid", "unpaid"]),
  createDate: z.date(),
  dueDate: z.date(),
  label: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof invoiceSchema>
