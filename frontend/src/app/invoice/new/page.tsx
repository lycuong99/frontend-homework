import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InvoiceForm } from "@/app/invoice/invoice-form";
export default async function Create() {
  return (
    <main className="flex min-h-screen flex-col px-16 py-10">
      <h1 className="text-3xl font-bold mb-6 px-6">Create Invoice</h1>
      <InvoiceForm />
    </main>
  );
}
