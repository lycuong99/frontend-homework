import InvoiceList from "./invoice-list";

export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col  py-10">
      <InvoiceList />
    </main>
  );
}
