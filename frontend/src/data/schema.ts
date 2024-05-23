import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

const invoiceStatusSchema = z.enum(["draft", "late", "paid", "pending"]);

const invoiceLineItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.coerce.number().optional(),
  quantity: z.coerce.number().positive(),
  rate: z.string(),
  price: z.coerce.number().positive(),
});

const customerSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});

const invoiceNoteSchema = z.object({
  id: z.number(),
  text: z.string(),
  createDate: z.date(),
});

const invoiceSchema = z.object({
  id: z.string(),
  status: invoiceStatusSchema,
  amount: z.number(),
  createDate: z.union([z.date(), z.string()]),
  dueDate: z.union([z.date(), z.string()]),
  customer: customerSchema,
  items: z.array(invoiceLineItemSchema).optional(),
  tax: z.coerce.number().positive().optional(),
  notes: z.string().optional(),
  bankAccount: z.string().optional(),
  bankName: z.string().optional(),
  messages: z.array(invoiceNoteSchema).optional(),
});

export { invoiceSchema, invoiceStatusSchema, invoiceLineItemSchema, customerSchema, invoiceNoteSchema };
