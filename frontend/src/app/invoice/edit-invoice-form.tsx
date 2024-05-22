"use client";

import { useStore } from "@/store";
import { InvoiceForm } from "./invoice-form";
import { Invoice } from "@/types/invoice";
import { useRouter } from "next/navigation";


const EditInvoiceForm = ({invoiceId}: {invoiceId: string}) => {
  const { updateInvoice, getInvoice } = useStore();
  const router = useRouter()
  const handleSubmit = (data: Invoice) => {
    console.log(data);

    updateInvoice(data)
    router.push('/invoice')
  
  };
  return <InvoiceForm onSubmit={handleSubmit} defaultValues={getInvoice(invoiceId)} />;
};
export { EditInvoiceForm };