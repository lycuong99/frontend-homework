import { DataTable } from "@/components/data-table";
import Image from "next/image";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { invoiceSchema } from "@/data/schema";
import { columns } from "@/components/columns";
import jsonInvoices from "@/data/invoices.json";
import { Invoice } from "@/types/invoice";

async function getTasks() {
  // const data = await fs.readFile(path.join(process.cwd(), "app/(app)/examples/tasks/data/tasks.json"));

  // const tasks = JSON.parse(data.toString());

  // return z.array(taskSchema).parse(tasks);
  const data: Invoice[] = jsonInvoices as Invoice[];
  return data;
}

export default async function Home() {
  const invoices = await getTasks();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-16 py-10">
      <DataTable data={invoices} columns={columns} />
    </main>
  );
}
