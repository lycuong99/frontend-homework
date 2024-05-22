import { CreateInvoiceForm } from "../create-invoice-form";
export default async function Create() {
  return (
    <main className="flex min-h-screen flex-col px-16 py-10">
      <h1 className="text-3xl font-bold mb-6 px-6">Create Invoice</h1>
      <CreateInvoiceForm  />
    </main>
  );
}
