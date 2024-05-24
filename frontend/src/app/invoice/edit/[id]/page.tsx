import { EditInvoiceForm } from "../../edit-invoice-form";

export default async function Edit({
    params,
  }: {
    params: { id: string };
  }) {
    
  return (
    <main className="container flex min-h-screen flex-col  py-10">
      <h1 className="text-3xl font-bold mb-6 px-6">Edit Invoice {params.id}</h1>
      <EditInvoiceForm invoiceId={params.id}  />
    </main>
  );
}
