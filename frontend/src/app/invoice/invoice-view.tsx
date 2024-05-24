"use client";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useStore } from "@/store";
import { formatDate } from "@/utils/date-format";
import { formatCurrency } from "@/utils/number-format";
import { Pen } from "lucide-react";
import Link from "next/link";

function getSubtotal(items: { quantity: number; price: number }[]) {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
}
function getTotal(subtotal: number, taxInPercent: number) {
  return subtotal + taxInPercent * subtotal;
}
const sample = {
  id: "MX7553",
  status: "draft",
  createDate: "2019-01-01",
  dueDate: "2019-01-01",
  amount: 1000,
  tax: 10,
  notes: "Message to you",
  customer: {
    id: 123,
    name: "Ly Van Cuong",
    email: "lycuong99@gmail.com",
    phone: "0987654321",
    address: "123 Street, District 9, Ho Chi Minh City",
  },
  items: [
    {
      id: 123,
      name: "p1",
      quantity: 10,
      rate: "pieces",
      price: 10,
    },
    {
      id: 123,
      name: "p1",
      quantity: 10,
      rate: "pieces",
      price: 20,
    },
  ],
};

export function InvoiceView({ id }: { id: string }) {
  const { getInvoice } = useStore();
  const invoice = getInvoice(id);

  if (!invoice) return null;

  const subtotal = getSubtotal(invoice.items ?? []);
  const taxFee = (subtotal * (invoice.tax ?? 0)) / 100;
  const total = getTotal(subtotal, invoice.tax ?? 0);

  return (
    <Card className="p-8 flex flex-col gap-12">
      <CardTitle className="text-2xl flex items-center gap-4">
        <span> #{invoice.id} </span>
        <StatusBadge status={invoice.status}>{invoice.status}</StatusBadge>
        <Button variant={"ghost"} className="rounded-full" asChild>
          <Link href={`/invoice/edit/${id}`}>
            <Pen />
          </Link>
        </Button>
      </CardTitle>

      <div className="flex gap-8 flex-col">
        <ViewItem label="Invoice To">
          {invoice.customer.name} <br />
          {invoice.customer.email} <br />
          {invoice.customer.phone} <br />
          {invoice.customer.address} <br />
        </ViewItem>
        <div className="grid grid-cols-2">
          <ViewItem label="Date Create">{formatDate(invoice.createDate)}</ViewItem>
          <ViewItem label="Due Date">{formatDate(invoice.dueDate)}</ViewItem>
        </div>
      </div>
      {invoice.notes && <ViewItem label="Notes">{invoice.notes}</ViewItem>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead className="w-[320px]">Item Name</TableHead>
            <TableHead className="w-[120px]">Quantity</TableHead>
            <TableHead className="w-[220px]">Rate</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right" align="right">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoice.items?.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.rate}</TableCell>
              <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
              <TableCell className="text-right">{formatCurrency((item?.quantity ?? 0) * (item?.price ?? 0))}</TableCell>
            </TableRow>
          ))}

          <tr>
            <TableCell colSpan={4}></TableCell>
            <TableCell className="text-gray-600 text-right">Subtotal</TableCell>
            <TableCell className="text-right">{formatCurrency(subtotal)}</TableCell>
          </tr>

          <tr>
            <TableCell colSpan={4}></TableCell>
            <TableCell className="text-gray-600 text-right">Tax {invoice.tax ?? "-"}%</TableCell>
            <TableCell className="text-right">{formatCurrency(taxFee)}</TableCell>
          </tr>

          <tr>
            <TableCell colSpan={4}></TableCell>
            <TableCell className="font-semibold text-lg text-right">Total</TableCell>
            <TableCell className="font-semibold text-lg text-right">{formatCurrency(total)}</TableCell>
          </tr>
        </TableBody>
      </Table>
    </Card>
  );
}

const ViewItem = ({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="flex gap-1 flex-col">
      <p className="text-lg font-semibold">{label}</p>
      <p className="text-md font-normal text-gray-700 leading-6">{children}</p>
    </div>
  );
};
