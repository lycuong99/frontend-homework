export type InvoiceStatus = "draft" | "late" | "paid" | "pending";
export type Invoice = {
  id: string;
  //   title: string;
  status: InvoiceStatus;
  amount: number;
  createDate: Date | string;
  dueDate: Date | string;
  customer: Customer;
  items?: InvoiceLineItem[];
  tax?: number;
  notes?: string;
  bankAccount?: string;
  bankName?: string;
};

export type InvoiceLineItem = {
  id: number;
  name: string;
  amount?: number;
  quantity: number;
  unitPrice: string;
  price: number;
};

export type InvoiceNote = {
  id: number;
  text: string;
  createDate: Date;
};

export type Customer = {
  id?: number;
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  email?: string;
  phone?: string;
};
