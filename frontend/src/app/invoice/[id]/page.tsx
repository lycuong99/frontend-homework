import { InvoiceView } from "../invoice-view";

export default async function InvoiceViewPage({
  params,
}: {
  params: { id: string };
}) {

  return (
    <main className="container  contain  py-10">
      {/* Welcome to Homepage {params.id} */}
      <InvoiceView id={params.id} />
    </main>
  );
}
