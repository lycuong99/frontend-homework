import { CreateInvoiceForm } from "../create-invoice-form";
export default async function Create() {
  return (
    <main className="container flex min-h-screen flex-col  py-10">
      <h1 className="text-3xl font-bold mb-6 px-6">Create Invoice</h1>
      <CreateInvoiceForm  />
    </main>
  );
}
