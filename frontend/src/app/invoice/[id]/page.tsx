import { InvoiceView } from "../invoice-view";

export default async function InvoiceViewPage({
  params,
}: {
  params: { id: string };
}) {

  return (
    <main className=" contain px-16 py-10">
      {/* Welcome to Homepage {params.id} */}
      <InvoiceView id={params.id} />
    </main>
  );
}
