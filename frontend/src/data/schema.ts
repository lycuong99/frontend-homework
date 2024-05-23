import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

const invoiceStatusSchema = z.enum(["draft", "late", "paid", "pending"]);

const invoiceLineItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.coerce.number().optional(),
  quantity: z.coerce.number().nonnegative(),
  rate: z.string(),
  price: z.coerce.number().nonnegative(),
});

const customerSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

const invoiceNoteSchema = z.object({
  id: z.number(),
  text: z.string(),
  createDate: z.date(),
});

const invoiceSchema = z.object({
  id: z.string().optional(),
  status: invoiceStatusSchema,
  amount: z.number().optional(),
  createDate: z.union([z.date(), z.string()]),
  dueDate: z.union([z.date(), z.string()]),
  customer: customerSchema,
  items: z.array(invoiceLineItemSchema).optional(),
  tax: z.coerce.number().nonnegative().optional(),
  notes: z.string().optional(),
  bankAccount: z.string(),
  bankName: z.string(),
  accountName: z.string(),
  messages: z.array(invoiceNoteSchema).optional(),
  isSentMail: z.coerce.boolean().optional()
});

export { invoiceSchema, invoiceStatusSchema, invoiceLineItemSchema, customerSchema, invoiceNoteSchema };
