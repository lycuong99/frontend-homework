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
export function InvoiceForm() {
  const form = useForm<Invoice>({
    defaultValues: {
      id: "MX7553",
      status: "draft",
      dueDate: "2019-01-01",
      amount: 1000,
      tax: 0,
      customer: {
        id: 123,
        name: "Ly Van Cuong",
      },
      items: [
        {
          id: 123,
          name: "p1",
          quantity: 10,
          unitPrice: "pieces",
        },
      ],
    },
  });

  function onSubmit(data: Invoice) {
    console.log(data);
  }
  const results = useWatch({ control: form.control, name: "items" });

  function getSubTotal(items: Invoice["items"]) {
    let result = items?.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    return Number.isNaN(result) ? "-" : result;
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
                type="email"
                placeholder="abc@example.com"
              />
            </div>

            <div className="flex-1 grid grid-cols-2 gap-4">
              <Textfield
                name="id"
                label="Invoice Number"
                placeholder="Invoice Number"
              />

              <Selectfield
                name="status"
                label="Status"
                placeholder="Select a status"
              >
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </Selectfield>

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
            </div>

            <div className="w-full">
              <TextareaControl name="note" label="Notes" placeholder="Notes" />
            </div>

          </CardContent>
        </Card>

        <InvoiceItemTable />
        <Separator />
        <div className="flex justify-between">
          <div>
            <h2 className="text-lg font-semibold">Payment</h2>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <Textfield
                className="flex-1"
                name="bankName"
                label="Bank Name"
                placeholder="ex. BIDV Bank"
              />
              <Textfield
                className="flex-1"
                name="banAccount"
                label="Bank Abount"
                placeholder="10102012121212"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-[400px]">
            <div className="flex justify-between gap-12">
              <p>Subtotal</p>
              <p>{getSubTotal(results)}</p>
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
              <p>{getSubTotal(results)}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-[400px] self-end">
          <Button type="submit" className="w-full" variant={"outline"}>
            Save as Draft
          </Button>
          <Button type="submit" className="w-full">
            Save & Send
          </Button>
        </div>
      </form>
    </Form>
  );
}
