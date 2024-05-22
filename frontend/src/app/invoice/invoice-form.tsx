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
export function InvoiceForm() {
  const form = useForm<Invoice>({
    defaultValues: {
      id: "MX7553",
      status: "draft",
      dueDate: "2019-01-01",
      amount: 1000,
      customer: {
        id: 123,
        name: "Ly Van Cuong",
      },
      items: [
        {
          id: 123,
          name: "p1",
          quantity: 10,
          unitPrice: 100,
        },
      ],
    },
  });

  function onSubmit(data: Invoice) {
    console.log(data);
  }
  const results = useWatch({ control: form.control, name: "items" });

  function getSubTotal(items: Invoice["items"]) {
    return items?.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Invoice</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 space-y-8">
            <div className="flex gap-4">
              <div className="flex-1">
                <Textfield name="id" label="Invoice Number" placeholder="Invoice Number" />
              </div>
              <div className="flex-1">
                <Selectfield name="status" label="Status" placeholder="Select a status">
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </Selectfield>
              </div>
            </div>

            <div className="flex gap-4">
              <DatePicker name="createDate" label="Invoice Date" placeholder="Pick a date" />
              <DatePicker name="dueDate" label="Due Date" placeholder="Pick a date" />
            </div>
          </CardContent>
        </Card>

        <InvoiceItemTable />
        <Separator />
        <div className="flex flex-col">
          <div className="flex justify-between gap-12">
            <p>Subtotal</p>
            <p>{getSubTotal(results)}</p>
          </div>
          <div className="flex  justify-between gap-12">
            <p>VAT</p>
            <p>{getSubTotal(results)}</p>
          </div>
          <div className="flex  justify-between gap-12">
            <p>Total</p>
            <p>{getSubTotal(results)}</p>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
}
