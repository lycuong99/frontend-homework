"use client";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";
import { useStore } from "@/store";

const InvoiceList = () => {
  const { invoices } = useStore();
  return <DataTable data={invoices} columns={columns} />;
};

export default InvoiceList;
