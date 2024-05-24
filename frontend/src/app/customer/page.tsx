import CustomerList from "./customer-list";


export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col py-10">
      <CustomerList />
    </main>
  );
}
