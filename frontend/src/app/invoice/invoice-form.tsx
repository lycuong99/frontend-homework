"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Invoice } from "@/types/invoice";
import { useForm, useWatch } from "react-hook-form";
import { SelectItem } from "@/components/ui/select";
import { statuses } from "@/data/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textfield } from "@/components/form-elements/text-field";
import { DatePicker } from "@/components/form-elements/date-picker";
import { Selectfield } from "@/components/form-elements/select-field";
import { InvoiceItemTable } from "@/app/invoice/InvoiceItemTable";
import { Separator } from "@/components/ui/separator";
import { TextareaControl } from "@/components/form-elements/text-area";
import { getSubtotal, getTotal } from "./utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { invoiceSchema } from "@/data/schema";
import { formatCurrency } from "@/utils/number-format";
import { Dot, MailCheck, MailIcon, MailPlus } from "lucide-react";
import { toast } from "sonner";

const sample: Partial<Invoice> = {
  status: "draft",
  
};

export function InvoiceForm({
  onSubmit: onSubmitCallback,
  defaultValues = sample,
}: {
  onSubmit: (data: Invoice) => void;
  defaultValues?: Partial<Invoice>;
}) {
  const form = useForm<Invoice>({
    defaultValues: defaultValues,
    resolver: zodResolver(invoiceSchema),
  });

  function onSubmit(data: Invoice) {
    console.log(data);
    const subtotal = getSubtotal(data.items ?? []);
    const total = getTotal(subtotal, data.tax ?? 0);
    const submitData = {
      ...data,
      amount: total,
    };
    onSubmitCallback(submitData);
  }

  const results = useWatch({ control: form.control, name: "items" });
  const tax = useWatch({ control: form.control, name: "tax" });

  const subtotal = getSubtotal(results ?? []);
  const total = getTotal(subtotal, tax ?? 0);
  const isSentMail = useWatch({ control: form.control, name: "isSentMail" });
  const email = useWatch({ control: form.control, name: "customer.email" });

  const canSendMail = !isSentMail && !!email && form.formState.isValid;
  form.register("isSentMail");

  function handleSendMail() {
    form.setValue("isSentMail", true);
    toast("Mail has been sent.");
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (e) => {
          console.log("Error", e);
        })}
        className="flex flex-col gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col xl:flex-row gap-8 flex-wrap">
            <div className="flex-1 grid grid-cols-2 gap-4">
              <Textfield
                className="flex-1"
                name="customer.name"
                label="Customer Name"
                placeholder="Jonh dow"
              />

              <Textfield
                name="customer.phone"
                label="Customer Phone"
                placeholder="Customer Number"
              />

              <Textfield
                name="customer.address"
                label="Address"
                placeholder="Address"
              />
              <Textfield
                name="customer.email"
                label="Email"
                // type="email"
                placeholder="abc@example.com"
              />
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4">
              {/* <Textfield
                name="id"
                label="Invoice Number"
                placeholder="Invoice Number"
              /> */}

              <DatePicker
                name="createDate"
                label="Invoice Date"
                placeholder="Pick a date"
              />
              <DatePicker
                name="dueDate"
                label="Due Date"
                placeholder="Pick a date"
              />
              <Selectfield
                name="status"
                label="Status"
                placeholder="Select a status"
              >
                {statuses.map((status) => (
                  <SelectItem
                    key={status.value}
                    value={status.value}
                    className="flex"
                  >
                    <div className="flex items-center">{status.label}</div>
                  </SelectItem>
                ))}
              </Selectfield>
            </div>

            <div className="w-full">
              <TextareaControl name="note" label="Notes" placeholder="Notes" />
            </div>
          </CardContent>
        </Card>

        <InvoiceItemTable />
        <Separator />

        <div className="flex justify-between">
          <Payment />

          <div className="flex flex-col gap-2 w-[400px]">
            <div className="flex justify-between gap-12">
              <p>Subtotal</p>
              <p>{formatCurrency(subtotal)}</p>
            </div>
            <div className="flex items-center  justify-between gap-12">
              <p>Tax(%)</p>
              <Textfield
                className="text-right w-20"
                name="tax"
                placeholder="%"
                type="number"
              />
            </div>
            <div className="flex  justify-between gap-12">
              <p className="font-bold">Total</p>
              <p>{formatCurrency(total)}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-[400px] self-end">
          <Button type="submit" className="w-full" variant={"outline"} asChild>
            <Link href="/invoice">Cancel</Link>
          </Button>
          <Button type="submit" className="w-full">
            Save
          </Button>
          <Button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700"
            variant={"default"}
            disabled={!canSendMail}
            onClick={handleSendMail}
          >
            {isSentMail ? (
              <MailCheck className="h-5 w-5 mr-2 " />
            ) : (
              <MailIcon className="h-5 w-5 mr-2 " />
            )}
            Send
          </Button>
        </div>
      </form>
    </Form>
  );
}

const Payment = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Payment</h2>
      <div className="flex-1 grid grid-cols-2 gap-4">
        <Textfield
          className="flex-1"
          name="bankName"
          label="Bank Name"
          placeholder="ex. BIDV Bank"
        />
        <Textfield
          className="flex-1"
          name="bankAccount"
          label="Bank Abount"
          placeholder="ex. 123456789"
        />
         <Textfield
          className="flex-1"
          name="accountName"
          label="Abount Name"
          placeholder="ex. John Dow"
        />
      </div>
    </div>
  );
};
