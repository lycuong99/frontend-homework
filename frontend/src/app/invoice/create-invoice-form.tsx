"use client";

import { useStore } from "@/store";
import { InvoiceForm } from "./invoice-form";
import { Invoice } from "@/types/invoice";
import { useRouter } from "next/navigation";

const CreateInvoiceForm = () => {
  const { addInvoice } = useStore();
  const router = useRouter()

  const handleSubmit = (data: Invoice) => {
    console.log(data);
    addInvoice({...data, id: `FX${Math.floor(Math.random() * 1000000)}` });
    router.push('/invoice')
  };
  return <InvoiceForm onSubmit={handleSubmit} />;
};
export { CreateInvoiceForm };
