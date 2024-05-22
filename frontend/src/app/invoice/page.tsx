import InvoiceList from "./invoice-list";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-16 py-10">
      <InvoiceList />
    </main>
  );
}
