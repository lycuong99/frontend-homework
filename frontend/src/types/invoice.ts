export type InvoiceStatus = "draft" | "late" | "paid" | "unpaid";
export type Invoice = {
  id: string;
  //   title: string;
  status: "draft" | "late" | "paid" | "unpaid";
  amount: number;
  //   createDate: Date | string;
  dueDate: Date | string;
  customer: Customer;
  items?: InvoiceLineItem[];
};

export type InvoiceLineItem = {
  id: number;
  name: string;
  amount: number;
  quantity: number;
  unitPrice: number;
};

export type InvoiceNote = {
  id: number;
  text: string;
  createDate: Date;
};

export type Customer = {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  email: string;
};
